import clientPromise from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray()
    res.json(movies)
  } catch (error) {
    console.error(error)
  }
}
