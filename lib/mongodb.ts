import { MongoClient } from 'mongodb';

const options = {};

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  // 빌드 시점이 아니라 실제 연결 시점에 확인한다
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
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
