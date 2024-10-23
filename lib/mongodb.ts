import { MongoClient } from 'mongodb'

let client: MongoClient
let clientPromise: Promise<MongoClient>
console.log(process.env.MONGODB_URI)
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

try {
  client = new MongoClient(process.env.MONGODB_URI)
  clientPromise = client.connect()
  console.log('MongoDB connected successfully!')
} catch (error) {
  console.error('Error connecting to MongoDB:', error)
  clientPromise = Promise.reject(error)
}

export default clientPromise
