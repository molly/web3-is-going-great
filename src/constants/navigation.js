export const SOCIAL = [
  {
    label: "Twitter",
    href: "https://twitter.com/web3isgreat",
    icon: "fab fa-twitter",
  },
  {
    label: "Mastodon",
    href: "https://indieweb.social/@web3isgreat",
    icon: "fab fa-mastodon",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/web3isgoinggreat.com",
    icon: "fab fa-bluesky",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/web3isgoinggreat/",
    icon: "fab fa-instagram",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@web3isgoinggreat",
    icon: "fab fa-threads",
  },
];

export const NAVIGATION = [
  {
    label: "About",
    key: "about-header",
    children: [
      {
        label: "About this project",
        short: "About",
        path: "/about",
      },
      {
        label: "What is web3?",
        path: "/what",
      },
      { label: "FAQ", path: "/faq" },
      {
        label: "License and attribution",
        short: "License",
        path: "/attribution",
      },
    ],
  },
  {
    label: "Follow",
    key: "follow-header",
    children: [
      ...SOCIAL,
      {
        label: "RSS",
        path: "/feed.xml",
      },
    ],
  },
  {
    label: "Leaderboard",
    path: "/charts/top",
  },
  {
    label: "Glossary",
    path: "/glossary",
  },
  {
    label: "Contribute",
    path: "/contribute",
  },
  {
    label: "Newsletter",
    href: "https://citationneeded.news/",
  },
  {
    label: "Store",
    href: "https://store.mollywhite.net/",
  },
];
