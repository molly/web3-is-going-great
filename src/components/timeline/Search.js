import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import FILTERS from "../../constants/filters";

const MINIMUM_SEARCH_LENGTH = 3;

export default function Search() {
  const router = useRouter();
  const { query } = router;

  const [searchTerm, setSearchTerm] = useState(query.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const pushParams = { shallow: true };

    if (
      debouncedSearchTerm &&
      query.search !== debouncedSearchTerm &&
      debouncedSearchTerm.length > MINIMUM_SEARCH_LENGTH
    ) {
      query.search = debouncedSearchTerm;
      router.push(`/?search=${debouncedSearchTerm}`, null, pushParams);
    } else if (!debouncedSearchTerm && query.search) {
      delete query.search;
      router.push("/", null, pushParams);
    }
  }, [router, query, debouncedSearchTerm]);

  return (
    <div>
      <input
        className="search-input"
        placeholder="Search"
        value={searchTerm}
        onInput={(event) => setSearchTerm(event.target.value)}
      ></input>
    </div>
  );
}
Search.propTypes = {
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.theme)))
      .isRequired,
    tech: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.tech)))
      .isRequired,
    blockchain: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(FILTERS.blockchain))
    ).isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedEntryFromSearch: PropTypes.func.isRequired,
};
