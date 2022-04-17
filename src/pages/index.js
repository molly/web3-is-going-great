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
  let props = { initialFilters: copy(EMPTY_FILTERS_STATE) };
  if (context.query) {
    if (context.query.collection) {
      // Filters and collections are mutually exclusive
      props.initialFilters.collection = context.query.collection;
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
      props.startAtId = context.query.id;
    }
  }

  const promises = [
    getEntries({
      ...props.initialFilters,
      ...(props.startAtId && { startAtId: props.startAtId }),
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
      ...(context.query.collection && {
        initialCollection: context.query.collection,
      }),
    },
  };
}

export default function IndexPage({
  firstEntries,
  startAtId,
  initialFilters,
  glossary,
  griftTotal,
  allCollections,
  initialCollection,
}) {
  useGA();
  const router = useRouter();

  const [collection, setCollectionState] = useState(initialCollection);
  const [filters, setFilterState] = useState(initialFilters);
  const [selectedEntryFromSearch, setSelectedEntryFromSearch] = useState(null);

  useEffect(() => {
    // Restore state when someone hits the back button
    router.beforePopState(({ url }) => {
      const startOfQueryParams = url.indexOf("?");
      if (startOfQueryParams) {
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
    router.push({ query }, null, { shallow: true });
    setFilterState(filters);
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
    setCollectionState(coll);
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
        return getEntries({ ...filters, collection, cursor: pageParam });
      }
    },
    [collection, filters, selectedEntryFromSearch]
  );

  const queryResult = useInfiniteQuery(
    ["entries", filters, selectedEntryFromSearch, collection],
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
  initialCollection: PropTypes.string,
  glossary: PropTypes.object.isRequired,
  startAtId: PropTypes.string,
  griftTotal: PropTypes.number.isRequired,
  allCollections: PropTypes.object.isRequired,
};
