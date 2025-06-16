export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/matches/:id'],
      disallow: [],
    },
    sitemap: 'https://yallatv.vercel.app/sitemap.xml',
  }
}