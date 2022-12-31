import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../js/entry";

import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import useGA from "../hooks/useGA";

import { copy } from "../js/utilities";
import {
  EMPTY_FILTERS_STATE,
  FiltersPropType,
  FILTER_CATEGORIES,
} from "../constants/filters";

import { getEntries } from "../db/entries";
import { getGlossaryEntries } from "../db/glossary";
import { getMetadata } from "../db/metadata";

import Timeline from "../components/timeline/Timeline";

export async function getServerSideProps(context) {
  let props = {
    initialFilters: copy(EMPTY_FILTERS_STATE),
    initialStarred: false,
  };
  if (context.query) {
    if (context.query.collection) {
      // Filters, starred, and collections are mutually exclusive
      props.initialFilters.collection = context.query.collection;
    } else if (context.query.starred && Boolean(context.query.starred)) {
      props.initialStarred = true;
    } else if (FILTER_CATEGORIES.some((filter) => filter in context.query)) {
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

    if (context.query.id) {
      props.initialStartAtId = context.query.id;
    }
  }

  const promises = [
    getEntries({
      ...props.initialFilters,
      ...(props.initialStartAtId && { startAtId: props.initialStartAtId }),
      starred: props.initialStarred,
    }),
    getGlossaryEntries(),
    getMetadata(),
  ];

  const [firstEntries, glossary, metadata] = await Promise.all(promises);
  return {
    props: {
      ...props,
      firstEntries,
      glossary,
      griftTotal: metadata.griftTotal,
      allCollections: metadata.collections,
    },
  };
}

export default function IndexPage({
  firstEntries,
  initialStartAtId,
  initialFilters,
  initialStarred,
  glossary,
  griftTotal,
  allCollections,
}) {
  useGA();
  const router = useRouter();

  const [collection, setCollectionState] = useState(initialFilters.collection);
  const [filters, setFilterState] = useState(initialFilters);
  const [starred, setStarredState] = useState(initialStarred);
  const [startAtId, setStartAtId] = useState(initialStartAtId);
  const [selectedEntryFromSearch, setSelectedEntryFromSearch] = useState(null);

  useEffect(() => {
    // Restore state when someone hits the back button
    router.beforePopState(({ url }) => {
      if (!url.match(/^\/[^?]/)) {
        const startOfQueryParams = url.indexOf("?");
        if (startOfQueryParams > -1) {
          // Filters
          const params = new URLSearchParams(url.slice(startOfQueryParams));
          const restoredFilters = copy(EMPTY_FILTERS_STATE);
          for (let category of FILTER_CATEGORIES) {
            if (params.has(category)) {
              restoredFilters[category] = params.get(category).split(",");
            }
          }
          setFilterState(restoredFilters);

          // Start at ID
          if (params.has("id")) {
            setSelectedEntryFromSearch(params.get("id"));
          } else {
            setSelectedEntryFromSearch(null);
          }

          // Collection
          if (params.has("collection")) {
            setCollectionState(params.get("collection"));
          } else {
            setCollectionState(null);
          }
        }
      }
      return true;
    });
  }, [router]);

  const setFilters = (filters) => {
    const query = {};
    for (let category of FILTER_CATEGORIES) {
      // Avoid setting a bunch of query params without values
      if (filters[category].length > 0) {
        query[category] = filters[category].join(",");
      }
    }

    // We can't filter by categories AND show the starred filter, but if the only filter
    // being applied is sorting, we can maintain the starred filter
    if (Object.keys(query).length) {
      router.push({ query }, null, { shallow: true });
      setStarredState(false);
    } else {
      if (starred) {
        query.starred = true;
      }
      router.push({ query }, null, { shallow: true });
    }

    setFilterState(filters);
  };

  const setStarred = (starred) => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (starred) {
      router.push({ query: { starred: true } }, null, {
        shallow: true,
      });
    } else {
      router.push({ query: {} }, null, { shallow: true });
    }
    setSelectedEntryFromSearch(null);
    setFilterState({ ...EMPTY_FILTERS_STATE, sort: filters.sort });
    setCollectionState(null);
    setStarredState(starred);
  };

  const setCollection = (coll) => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (coll) {
      router.push({ query: { collection: coll } }, null, {
        shallow: true,
      });
    } else {
      router.push({ query: {} }, null, { shallow: true });
    }
    setSelectedEntryFromSearch(null);
    setFilterState(EMPTY_FILTERS_STATE);
    setStarredState(false);
    setCollectionState(coll);
  };

  const clearAllFiltering = (scrollToTop = false) => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    router.push({ query: {} }, null, { shallow: true });
    setSelectedEntryFromSearch(null);
    setFilterState(EMPTY_FILTERS_STATE);
    setStartAtId(null);
    setCollectionState(null);
  };

  const getFilteredEntries = useCallback(
    ({ pageParam = null }) => {
      if (selectedEntryFromSearch) {
        return getEntries({
          ...filters,
          collection,
          startAtId: selectedEntryFromSearch,
        });
      } else {
        return getEntries({
          ...filters,
          collection,
          starred,
          cursor: pageParam,
        });
      }
    },
    [collection, filters, starred, selectedEntryFromSearch]
  );

  const queryResult = useInfiniteQuery(
    [
      "entries",
      filters,
      selectedEntryFromSearch,
      collection,
      starred,
      startAtId,
    ],
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
      collection={collection}
      allCollections={allCollections}
      filters={filters}
      glossary={glossary}
      griftTotal={griftTotal}
      selectedEntryFromSearch={selectedEntryFromSearch}
      startAtId={startAtId}
      setCollection={setCollection}
      setFilters={setFilters}
      starred={starred}
      setStarred={setStarred}
      setSelectedEntryFromSearch={setSelectedEntryFromSearch}
      clearAllFiltering={clearAllFiltering}
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
  initialCollection: PropTypes.string,
  initialStarred: PropTypes.bool.isRequired,
  initialStartAtId: PropTypes.string,
  glossary: PropTypes.object.isRequired,
  griftTotal: PropTypes.number.isRequired,
  allCollections: PropTypes.object.isRequired,
};
