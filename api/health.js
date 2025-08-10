// api/health.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed' });
  }
  return res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
}
