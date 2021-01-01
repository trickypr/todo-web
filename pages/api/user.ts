import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from 'scripts/db'

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await dbConnect()

  if (req.method === 'GET') {
    try {
      const data = await db
        .collection('productAnalytics')
        .find({ productName: 'Do - web todos' })
        .toArray()

      res.status(200).json({ users: data[0].users })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }

    return
  } else if (req.method === 'POST') {
    try {
      const data = await db
        .collection('productAnalytics')
        .find({ productName: 'Do - web todos' })
        .toArray()

      const newUsers = data[0].users + 1
      await db
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

export default user
