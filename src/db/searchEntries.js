const algoliasearch = require("algoliasearch");

const client = algoliasearch("WFP48OIPSF", "1416e183c8d3f60b43c9b08eaea50348");
const index = client.initIndex("web3");

const getFacetFilters = (filters) => {
  const facetFilters = [];
  for (let filterType of ["tech", "blockchain", "theme"]) {
    for (let entry of filters[filterType]) {
      facetFilters.push(`${filterType}:${entry}`);
    }
  }
  return facetFilters;
};

export const search = async (query, filters) => {
  const facetFilters = getFacetFilters(filters);
  try {
    const hits = await index.search(
      query,
      facetFilters ? { facetFilters } : null
    );
    return hits;
  } catch (err) {
    console.error(err);
  }
};
