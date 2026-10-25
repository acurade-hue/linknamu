import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('linknamu');

    const profilesCollection = db.collection('profiles');

    const sampleProfile = {
      username: 'demo',
      name: '데모 사용자',
      bio: '이것은 데모 프로필입니다',
      photoUrl: 'https://via.placeholder.com/150',
      links: [
        {
          id: '1',
          title: '포트폴리오',
          url: 'https://example.com',
          clickCount: 0,
        },
        {
          id: '2',
          title: 'GitHub',
          url: 'https://github.com',
          clickCount: 0,
        },
        {
          id: '3',
          title: '블로그',
          url: 'https://blog.example.com',
          clickCount: 0,
        },
      ],
    };

    await profilesCollection.deleteOne({ username: 'demo' });
    await profilesCollection.insertOne(sampleProfile);

    console.log('✅ 샘플 데이터가 생성되었습니다!');
    console.log('http://localhost:3000/demo 에서 프로필을 확인할 수 있습니다.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
