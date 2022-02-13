import PropTypes from "prop-types";

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
    yikes: "Yikes",
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
    monero: "Monero",
    polygon: "Polygon",
    solana: "Solana",
    tezos: "Tezos",
    stablecoins: "stablecoins",
    wax: "WAX",
  },
};

export const EMPTY_FILTERS_STATE = {
  theme: [],
  tech: [],
  blockchain: [],
  sort: "Descending",
};

const ThemePropType = PropTypes.oneOf(Object.values(FILTERS.theme));
const TechPropType = PropTypes.oneOf(Object.values(FILTERS.tech));
const BlockchainPropType = PropTypes.oneOf(Object.values(FILTERS.blockchain));

export const FiltersPropType = PropTypes.shape({
  theme: PropTypes.arrayOf(ThemePropType).isRequired,
  tech: PropTypes.arrayOf(TechPropType).isRequired,
  blockchain: PropTypes.arrayOf(BlockchainPropType).isRequired,
  sort: PropTypes.oneOf(["Descending", "Ascending"]).isRequired,
});

export default FILTERS;
