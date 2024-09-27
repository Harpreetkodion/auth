// next.config.js
module.exports = {
  async middleware() {
    return [
      {
        source: '/profile',
        destination: '/login',
      },
      {
        source: '/login',
        destination: '/profile',
      },
    ];
  },
  images: {
    domains: ['*'],
  },
};

