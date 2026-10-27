import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Missing username' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const results = await db
      .collection('clicks')
      .aggregate([
        { $match: { username } },
        { $group: { _id: '$linkId', count: { $sum: 1 } } },
      ])
      .toArray();

    const counts: Record<string, number> = {};
    for (const { _id, count } of results) {
      counts[_id] = count;
    }

    return NextResponse.json({ counts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching click counts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, linkId } = await request.json();

    if (!username || !linkId) {
      return NextResponse.json(
        { success: false, message: 'Missing username or linkId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const clicksCollection = db.collection('clicks');
    const profilesCollection = db.collection('profiles');

    await clicksCollection.insertOne({
      linkId,
      username,
      timestamp: new Date(),
    });

    await profilesCollection.updateOne(
      { username, 'links.id': linkId },
      { $inc: { 'links.$.clickCount': 1 } }
    );

    return NextResponse.json(
      { success: true, message: 'Click recorded' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error recording click:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
