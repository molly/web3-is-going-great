const FILTERS = {
  theme: {
    badIdea: "Bad idea",
    bug: "Bug",
    bummer: "Bummer",
    environment: "Environment",
    fakeNews: "Fake news",
    goodNews: "Good news",
    hack: "Hack or scam",
    hmm: "Hmm",
    rugPull: "Rug pull",
    shady: "Shady business",
  },
  tech: {
    gaming: "blockchain gaming",
    currency: "cryptocurrency",
    dao: "DAO",
    dapps: "dApps",
    defi: "DeFi",
    metaverse: "metaverse",
    nft: "NFT",
  },
  blockchain: {
    avalanche: "Avalanche",
    bitcoin: "Bitcoin",
    bsc: "BSC",
    ethereum: "Ethereum",
    flow: "Flow",
    litecoin: "Litecoin",
    polygon: "Polygon",
    solana: "Solana",
    stablecoins: "Stablecoins",
    wax: "WAX",
  },
};

export const EMPTY_FILTERS_STATE = {
  theme: [],
  tech: [],
  blockchain: [],
  sort: "Descending",
};

export default FILTERS;
