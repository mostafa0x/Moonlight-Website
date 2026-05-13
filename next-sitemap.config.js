/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://moonlight-website-new-delta.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Generate single sitemap.xml instead of index + shards
  exclude: [
    '*/payment/*',
    '*/profile',
    '*/profile/*',
    '*/ticket/*',
    '/icon.png',
  ],
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => {
      // Remove the non-standard Host directive and its preceding comment
      // since Googlebot/Lighthouse flags 'Host:' as an unknown/invalid directive.
      return robotsTxt
        .replace(/# Host\nHost: .*\n?/g, '')
        .replace(/Host: .*\n?/g, '');
    },
  },
}

