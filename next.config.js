module.exports = {
  async headers() {
    return [
      {
        source: '/sample',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, stale-while-revalidate=20',
          },
        ],
      },
    ];
  },
};