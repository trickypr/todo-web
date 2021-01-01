import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect, dbGetCollection } from 'scripts/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await dbConnect()

  if (req.method === 'GET') {
    try {
      const data = await dbGetCollection(db)
      res.status(200).json({ todos: data.todos })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }

    return
  } else if (req.method === 'POST') {
    try {
      const data = await dbGetCollection(db)

      const newTodos = data.todos + 1
      await db
        .collection('productAnalytics')
        .updateOne(
          { productName: 'Do - web todos' },
          { $set: { todos: newTodos } }
        )

      res.status(200).json({ todos: newTodos })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }

    return
  }

  res.status(405).json({ error: '405 Method Not Allowed' })
}
