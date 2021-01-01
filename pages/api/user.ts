import connectToDb from 'middleware/db'

const user = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await req.db
        .collection('productAnalytics')
        .find({ productName: 'Do - web todos' })
        .toArray()

      res.status(200).json({ users: data[0].users })
    } catch (err) {
      res.statusCode(500).json({ error: err.message })
    }

    return
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

      res.status(200).json({ users: newUsers })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }

    return
  }

  res.status(405).json({ error: '405 Method Not Allowed' })
}

export default connectToDb(user)
