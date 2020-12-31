import connectToDb from 'middleware/db'

const user = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await req.db
        .collection('productAnalytics')
        .find({ productName: 'Do - web todos' })
        .toArray()

      res.statusCode = 200
      console.log(data[0].users)
      res.end(String(data[0].users))
    } catch (err) {
      res.statusCode = 502
      res.end(err.message)
    }
  } else if (req.method === 'POST') {
    try {
      const data = await req.db
        .collection('productAnalytics')
        .find({ productName: 'Do - web todos' })
        .toArray()

      const newUsers = data[0].users + 1
      await req.db
        .collection('productAnalytics')
        .updateOne(
          { productName: 'Do - web todos' },
          { $set: { users: newUsers } }
        )

      res.statusCode = 200
      res.end(String(newUsers))
    } catch (err) {
      res.statusCode = 502
      res.end(err.message)
    }
  } else {
    res.statusCode = 404
    res.end()
  }
}

export default connectToDb(user)
