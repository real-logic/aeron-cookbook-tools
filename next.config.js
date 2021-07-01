module.exports = {
  async headers() {
    return [
      {
        source: '/css/fonts.css',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, max-age=604800, must-revalidate',
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/pollen/js/pollen.js',
        destination: 'https://plausible.io/js/plausible.js'
      },
      {
        source: '/pollen/api/trail',
        destination: 'https://plausible.io/api/event'
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap.js');
      require('./scripts/generate-rss.js');
    }

    return config;
  },
  images: {
    domains: ['www.shaunlaurens.com', 'services.swpc.noaa.gov'],
  },
}