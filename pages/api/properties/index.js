import db from '../../../db/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    db.all("SELECT * FROM properties", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(rows);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}