FROM keymetrics/pm2:10-alpine

ENV HOME=/home/node

# set timezone
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
ENV TZ=Asia/Calcutta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Clean APK cache
RUN rm -rf /var/cache/apk/*

USER root
# set working dir

WORKDIR $HOME/app

# copy dep files to tmp folder and install from lock file
COPY package.json $HOME/tmp/
COPY package-lock.json $HOME/tmp/
RUN cd $HOME/tmp/ && npm install

# copy build resources 

COPY src $HOME/app/src
COPY tsconfig.json $HOME/app/tsconfig.json
COPY tslint.json $HOME/app/tslint.json
COPY run.sh $HOME/app/run.sh
COPY environment $HOME/app/environment
RUN cp $HOME/tmp/package.json $HOME/app/package.json
RUN cp $HOME/tmp/package-lock.json $HOME/app/package-lock.json

# link node_modules installed in tmp folder to working dir
RUN cd $HOME/app && ln -s $HOME/tmp/node_modules

# build project
RUN cd $HOME/app && npm run build

# copy pm2 config 
COPY pm2.json ./

EXPOSE 3027
EXPOSE 9027