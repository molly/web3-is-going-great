import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../js/entry";

import { EMPTY_FILTERS_STATE } from "../constants/filters";
import { useInfiniteQuery } from "react-query";
import useGA from "../hooks/useGA";

import { getEntries } from "../db/entries";
import { getGlossaryEntries } from "../db/glossary";

import Timeline from "../components/timeline/Timeline";

export async function getServerSideProps(context) {
  let props = {};
  if (
    context.query &&
    context.query.id &&
    context.query.id.match(/\d{4}-\d{2}-\d{2}-?\d{0,2}/)
  ) {
    props.firstEntries = await getEntries({ startAtId: context.query.id });
    props.startAtId = context.query.id;
  } else {
    props.firstEntries = await getEntries({});
  }
  props.glossary = await getGlossaryEntries();
  return { props };
}

export default function IndexPage({ firstEntries, startAtId, glossary }) {
  useGA();

  const [filters, setFilters] = useState(EMPTY_FILTERS_STATE);
  const [selectedEntryFromSearch, setSelectedEntryFromSearch] = useState(null);

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
  glossary: PropTypes.object.isRequired,
  startAtId: PropTypes.string,
};
