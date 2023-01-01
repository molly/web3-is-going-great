module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/feed",
        destination: "/feed.xml",
        permanent: true,
      },
      { source: "/suggest", destination: "/contribute", permanent: true },
      { source: "/charts", destination: "/charts/top", permanent: false },
    ];
  },
};
