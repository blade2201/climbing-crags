import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

//TODO Add secret key to prevent unauthorized access
export default async function handler(req, res) {
  const body = req.body;
  if (req.method === 'POST') {
    const client = await clientPromise;
    if (!body) {
      return res.status(400).json({ error: 'Bad request (No body)' });
    }
    if (
      !body.title ||
      !body.comment ||
      (typeof body.rating !== 'number' && body.rating !== NaN) ||
      !body.path ||
      !body.user
    ) {
      return res.status(400).json({ error: 'Bad request (Missing fields)' });
    }

    try {
      const db = client.db('Climbing-crags');
      const commentsCollection = db.collection('comments');
      const commentInsertion = await commentsCollection.insertOne({
        ...body,
        comment_rating: 0,
        id: body.path.split('/')[2],
      });
      return res.status(200).json(commentInsertion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const client = await clientPromise;
    try {
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
    const client = await clientPromise;
    if (!body) {
      return res.status(400).json({ error: 'Bad request (No body)' });
    }
    if (
      !body.id ||
      (typeof body.modifyingVote !== 'number' && body.modifyingVote !== NaN) ||
      (typeof body.vote !== 'number' && body.vote !== NaN) ||
      !body.path ||
      !body.email
    ) {
      return res.status(400).json({ error: 'Bad request (Missing fields)' });
    }
    try {
      const email = body.email;
      const db = client.db('Climbing-crags');
      const commentsCollection = db.collection('comments');
      const commentsCursor = await commentsCollection.findOneAndUpdate(
        { _id: new ObjectId(body.id) },
        {
          $inc: { comment_rating: body.modifyingVote },
          $set: {
            votes: {
              [`${email}`]: body.vote,
            },
          },
        },
      );
      return res.status(200).json(commentsCursor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad request (Wrong method)' });
}
