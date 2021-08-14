import { MongoClient, Db } from "mongodb"

export namespace AppDb {
  let dbConnection: Db
  const MONGO_DB_URI = "mongodb://localhost:27017/hackathon"

  export const establishConnection = async () => {
    try {
      dbConnection = (
        await MongoClient.connect(MONGO_DB_URI, {
          loggerLevel: "debug"
        })
      ).db()
    } catch (err) {
      throw err
    }

    return dbConnection
  }

  export const getConnection = () => {
    return dbConnection
  }

  export const getCollection = <T>(name: string) => {
    return getConnection().collection<T>(name)
  }
}
