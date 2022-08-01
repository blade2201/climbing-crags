import clientPromise from '../../../utils/mongodb';

//TODO Add secret key to prevent unauthorized access
export default async function handler(req, res) {
  const body = req.body;
  if (req.method === 'PUT') {
    if (!body) {
      return res.status(400).json({ error: 'Bad request (No body)' });
    }
    if (!body.id || !body.imageSrc || !body.path || !body.cloudinaryId) {
      return res.status(400).json({ error: 'Bad request (Missing fields)' });
    }
    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const routesCollection = db.collection('routes');
      const routesCursor = await routesCollection.findOneAndUpdate(
        { id: body.id },
        {
          $push: {
            images: { $each: [{ src: body.imageSrc, id: body.cloudinaryId }], $position: 0 },
          },
        },
      );
      return res.status(200).json(routesCursor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad request (Wrong method)' });
}
