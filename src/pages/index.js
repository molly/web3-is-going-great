import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../js/entry";

import {
  EMPTY_FILTERS_STATE,
  FiltersPropType,
  FILTER_CATEGORIES,
} from "../constants/filters";
import { useInfiniteQuery } from "react-query";
import useGA from "../hooks/useGA";
import { copy } from "../js/utilities";

import { getEntries } from "../db/entries";
import { getGlossaryEntries } from "../db/glossary";

import Timeline from "../components/timeline/Timeline";

export async function getServerSideProps(context) {
  let props = { initialFilters: copy(EMPTY_FILTERS_STATE) };
  if (context.query) {
    if (FILTER_CATEGORIES.some((filter) => filter in context.query)) {
      let hasFilterCategory = false;
      FILTER_CATEGORIES.forEach((filter) => {
        // Only one filter category can be active at a time, so if someone tries
        // to manually tack some on they'll still be ignored, but the filters
        // will display incorrectly. This hasFilterCategory check trims off
        // any more filters than are supported to faithfully represent the DB logic.
        if (!hasFilterCategory && filter in context.query) {
          props.initialFilters[filter] = context.query[filter].split(",");
          hasFilterCategory = true;
        }
      });
    }
    if (
      context.query.id &&
      context.query.id.match(/\d{4}-\d{2}-\d{2}-?\d{0,2}/)
    ) {
      props.startAtId = context.query.id;
    }
  }
  props.firstEntries = await getEntries({
    ...props.initialFilters,
    ...(props.startAtId && { startAtId: props.startAtId }),
  });

  props.glossary = await getGlossaryEntries();
  return { props };
}

export default function IndexPage({
  firstEntries,
  startAtId,
  initialFilters,
  glossary,
}) {
  useGA();

  const [filters, setFilterState] = useState(initialFilters);
  const [selectedEntryFromSearch, setSelectedEntryFromSearch] = useState(null);

  const setFilters = (filters) => {
    const query = new URLSearchParams(window.location.search);
    for (let category of FILTER_CATEGORIES) {
      // Deletes any stale filters
      query.delete(category);
      if (filters[category].length) {
        query.set(category, filters[category].join(","));
      }
    }
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState(null, null, newUrl);
    setFilterState(filters);
  };

  const getFilteredEntries = useCallback(
    ({ pageParam = null }) => {
      if (selectedEntryFromSearch) {
        return getEntries({ ...filters, startAtId: selectedEntryFromSearch });
      } else {
        return getEntries({ ...filters, cursor: pageParam });
      }
    },
    [filters, selectedEntryFromSearch]
  );

  const queryResult = useInfiniteQuery(
    ["entries", filters, selectedEntryFromSearch],
    getFilteredEntries,
    {
      refetchOnMount: false,
      getNextPageParam: (lastPage) => {
        if (!lastPage) {
          // This is the first fetch, so we have no cursor
          return null;
        }
        if (!lastPage.hasNext) {
          // No entries remain, return undefined to signal this to react-query
          return undefined;
        }
        return lastPage.entries[lastPage.entries.length - 1]._key;
      },
      ...(!selectedEntryFromSearch && {
        initialData: {
          pages: [firstEntries],
          pageParams: [undefined],
        },
      }),
    }
  );

  return (
    <Timeline
      queryResult={queryResult}
      filters={filters}
      glossary={glossary}
      selectedEntryFromSearch={selectedEntryFromSearch}
      startAtId={startAtId}
      setFilters={setFilters}
      setSelectedEntryFromSearch={setSelectedEntryFromSearch}
    />
  );
}

IndexPage.propTypes = {
  firstEntries: PropTypes.shape({
    entries: PropTypes.arrayOf(EntryPropType).isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool,
  }).isRequired,
  initialFilters: FiltersPropType.isRequired,
  glossary: PropTypes.object.isRequired,
  startAtId: PropTypes.string,
};
