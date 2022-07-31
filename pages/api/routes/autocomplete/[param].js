import clientPromise from '../../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Climbing-crags');
      const routesCollection = db.collection('routes');
      const pipeline = [
        {
          $search: {
            index: 'searchRoutes',
            autocomplete: {
              query: req.query.param || '',
              path: 'name',
              tokenOrder: 'sequential',
            },
          },
        },
        {
          $limit: 6,
        },
        {
          $project: {
            name: 1,
            grade_id: 1,
            crag: 1,
            sector: 1,
            id: 1,
          },
        },
      ];
      const routeCursor = await routesCollection.aggregate(pipeline);
      const routes = await routeCursor.toArray();
      return res.status(200).json(routes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error woop' });
    }
  }
  return res.status(400).json({ error: 'Bad request (Wrong method)' });
}
