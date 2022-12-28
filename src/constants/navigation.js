export const NAVIGATION = [
  {
    label: "About",
    key: "about-header",
    children: [
      {
        label: "About this project",
        path: "/about",
      },
      {
        label: "What is web3?",
        path: "/what",
      },
      {
        label: "License and attribution",
        path: "/attribution",
      },
    ],
  },
  {
    label: "Follow",
    key: "follow-header",
    children: [
      {
        label: "Twitter",
        href: "https://twitter.com/web3isgreat",
      },
      {
        label: "Mastodon",
        href: "https://indieweb.social/@web3isgreat",
      },
      {
        label: "Newsletter",
        href: "https://newsletter.mollywhite.net/",
      },
      {
        label: "RSS",
        path: "/feed.xml",
      },
    ],
  },
  {
    label: "Glossary",
    path: "/glossary",
  },
  {
    label: "Contribute",
    path: "/contribute",
  },
];
