import { MongoClient } from 'mongodb'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {}

const connectToDb = (handler) => async (req, res) => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await global.mongo.client.connect()
  }
  req.dbClient = global.mongo.client
  req.db = global.mongo.client.db(process.env.DB_NAME)

  handler(req, res)
}

export default connectToDb
