import { MongoClient } from 'mongodb'

declare global {
  var mongo: { client?: MongoClient }
}

global.mongo = global.mongo || {}

export const dbConnect = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    await global.mongo.client.connect()
  }

  return {
    client: global.mongo.client,
    db: global.mongo.client.db(process.env.DB_NAME),
  }
}
