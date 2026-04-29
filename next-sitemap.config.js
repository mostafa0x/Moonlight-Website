/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://moonlight-website-new-delta.vercel.app',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
