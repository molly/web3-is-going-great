const algoliasearch = require("algoliasearch");

const client = algoliasearch("WFP48OIPSF", "1416e183c8d3f60b43c9b08eaea50348");
const index = client.initIndex("web3");

const DEFAULT_PAGE_LENGTH = 20;

const getFacetFilters = (filters) => {
  const facetFilters = [];
  for (let filterType of ["tech", "blockchain", "theme"]) {
    for (let entry of filters[filterType]) {
      facetFilters.push(`${filterType}:${entry}`);
    }
  }
  return facetFilters;
};

export const search = async (query, filters, offset = 0) => {
  const facetFilters = getFacetFilters(filters) || null;
  const params = {
    offset,
    length: DEFAULT_PAGE_LENGTH,
    facetFilters,
  };

  try {
    const {
      hits,
      offset: newOffset,
      length,
      nbHits,
    } = await index.search(query, params);

    return {
      entries: hits,
      offset: newOffset,
      hasNext: offset + length < nbHits,
      length,
    };
  } catch (err) {
    console.error(err);
  }
};
