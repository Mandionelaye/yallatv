export default async function handler(req, res) {
  const response = await fetch('https://www.scorebat.com/video-api/v3/')
  const data = await response.json()
  res.status(200).json(data)
}