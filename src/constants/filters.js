const FILTERS = {
  theme: {
    badIdea: "Bad idea",
    bug: "Bug",
    fakeNews: "Fake news",
    hack: "Hack or scam",
    hmm: "Hmm",
    rugPull: "Rug pull",
    shady: "Shady business",
  },
  tech: {
    currency: "cryptocurrency",
    dao: "DAO",
    dapps: "dApps",
    defi: "DeFi",
    nft: "NFT",
  },
  blockchain: {
    bitcoin: "Bitcoin",
    bsc: "BSC",
    ethereum: "Ethereum",
    flow: "Flow",
    polygon: "Polygon",
    solana: "Solana",
  },
};

export const EMPTY_FILTERS_STATE = {
  theme: [],
  tech: [],
  blockchain: [],
  sort: "Descending",
};

export default FILTERS;
