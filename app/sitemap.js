export default function sitemap() {
  return [
    {
      url: 'https://yallatv.vercel.app/',
      lastModified: new Date(),
       priority: 1,
    },
    {
      url: 'https://yallatv.vercel.app/matches/:id',
      lastModified: new Date(),
       priority: 0.8,
    }
  ]
}