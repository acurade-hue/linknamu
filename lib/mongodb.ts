import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const uri = process.env.MONGODB_URI;
const options = {};

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await MongoClient.connect(uri, options);
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function getDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = await getMongoClient();
    cachedDb = client.db('linknamu');
    return cachedDb;
  } catch (error) {
    console.error('Database access error:', error);
    throw error;
  }
}
