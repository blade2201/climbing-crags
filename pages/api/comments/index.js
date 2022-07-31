import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

//TODO Add secret key to prevent unauthorized access
export default async function handler(req, res) {
  const body = req.body;
  if (req.method === 'POST') {
    if (!body) {
      return res.status(400).json({ error: 'Bad request (No body)' });
    }
    if (!body.title || !body.comment || !body.rating || !body.path || !body.user) {
      return res.status(400).json({ error: 'Bad request (Missing fields)' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const commentsCollection = db.collection('comments');
      await res.revalidate(body.path);
      const commentInsertion = await commentsCollection.insertOne({ ...body, comment_rating: 0 });
      return res.status(200).json(commentInsertion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const commentsCollection = db.collection('comments');
      const commentsCursor = await commentsCollection.find({ path: body.path });
      const comments = await commentsCursor.toArray();
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    if (!body) {
      return res.status(400).json({ error: 'Bad request (No body)' });
    }
    if (!body.id || !body.vote || !body.path) {
      return res.status(400).json({ error: 'Bad request (Missing fields)' });
    }
    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const commentsCollection = db.collection('comments');
      const commentsCursor = await commentsCollection.findOneAndUpdate(
        { _id: new ObjectId(body.id) },
        { $inc: { comment_rating: body.vote } },
      );
      return res.status(200).json(commentsCursor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad request (Wrong method)' });
}
