module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.web3isgoinggreat.com",
        port: "",
      },
    ],
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
