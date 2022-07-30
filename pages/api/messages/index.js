import clientPromise from '../../../utils/mongodb';

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
      const messagesCollection = db.collection('messages');
      await res.revalidate(body.path);
      const messageInsertion = await messagesCollection.insertOne(body);
      return res.status(200).json(messageInsertion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const messagesCollection = db.collection('messages');
      const messagesCursor = await messagesCollection.find({ path: body.path });
      const messages = await messagesCursor.toArray();
      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad request (Wrong method)' });
}
