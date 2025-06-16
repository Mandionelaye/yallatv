import { fetchData } from '../../utils/api';

export default async function handler(req, res) {
  try {
    const { date, league, status } = req.query;
    const params = {};
    
    if (date) params.date = date;
    if (league) params.league = league;
    if (status) params.status = status;
    
    const data = await fetchData('fixtures', params);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
}