import PropTypes from "prop-types";

const FILTERS = {
  theme: {
    artTheft: "Art theft",
    badIdea: "Bad idea",
    bug: "Bug",
    bummer: "Bummer",
    collapse: "Collapse",
    contagion: "Contagion",
    environment: "Environment",
    goodNews: "Good news",
    hack: "Hack or scam",
    hmm: "Hmm",
    law: "Law",
    layoffs: "Layoffs",
    reporting: "Reporting",
    rugPull: "Rug pull",
    shady: "Shady business",
    washTrade: "Wash trade",
    yikes: "Yikes",
  },
  tech: {
    gaming: "blockchain gaming",
    dao: "DAO",
    dapps: "dApps",
    defi: "DeFi",
    lending: "lending",
    metaverse: "metaverse",
    nft: "NFT",
    stablecoins: "stablecoins",
  },
  blockchain: {
    avalanche: "Avalanche",
    bitcoin: "Bitcoin",
    bsc: "BNB Chain",
    celo: "Celo",
    cosmos: "Cosmos",
    ethereum: "Ethereum",
    fantom: "Fantom",
    flow: "Flow",
    litecoin: "Litecoin",
    monero: "Monero",
    polygon: "Polygon",
    ripple: "XRP Ledger",
    solana: "Solana",
    terra: "Terra",
    tron: "Tron",
    tezos: "Tezos",
    wax: "WAX",
  },
};

export const EMPTY_FILTERS_STATE = {
  theme: [],
  tech: [],
  blockchain: [],
  sort: "Descending",
};

export const FILTER_CATEGORIES = ["theme", "tech", "blockchain"];

const ThemePropType = PropTypes.oneOf(Object.keys(FILTERS.theme));
const TechPropType = PropTypes.oneOf(Object.keys(FILTERS.tech));
const BlockchainPropType = PropTypes.oneOf(Object.keys(FILTERS.blockchain));

export const FiltersPropType = PropTypes.shape({
  theme: PropTypes.arrayOf(ThemePropType).isRequired,
  tech: PropTypes.arrayOf(TechPropType).isRequired,
  blockchain: PropTypes.arrayOf(BlockchainPropType).isRequired,
  sort: PropTypes.oneOf(["Descending", "Ascending"]).isRequired,
});

export default FILTERS;
