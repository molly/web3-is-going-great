/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";

import { getEntries } from "../../js/functions";

import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Loader from "../timeline/Loader";
import Footer from "../timeline/Footer";

export default function Timeline() {
  const [filters, setFilters] = useState({
    theme: [],
    tech: [],
    blockchain: [],
  });

  const getFilteredEntries = useCallback(
    ({ pageParam = null }) => {
      return getEntries({ ...filters, cursor: pageParam });
    },
    [filters]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    status,
  } = useInfiniteQuery("entries", getFilteredEntries, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        // This is the first fetch, so we have no cursor
        return null;
      }
      if (!lastPage.hasMore) {
        // No entries remain, return undefined to signal this to react-query
        return undefined;
      }
      return lastPage.entries[lastPage.entries.length - 1]._key;
    },
  });

  const hasMoreEntries = useMemo(() => {
    if (data && data.pages) {
      return data.pages[data.pages.length - 1].hasMore;
    }
    return true;
  }, [data]);

  const renderScrollSentinel = () => (
    <InView
      threshold={0}
      onChange={(inView) => {
        if (inView && !isFetching) {
          fetchNextPage();
        }
      }}
    >
      <div className="scroll-sentinel"></div>
    </InView>
  );

  const renderEntries = () => {
    return (
      <article className="timeline">
        {data.pages.map((page, pageInd) => {
          const isLastPage = pageInd === data.pages.length - 1;
          return (
            <React.Fragment key={`page-${pageInd}`}>
              {page.entries.map((entry, entryInd) => {
                const isLastEntry = entryInd === page.entries.length - 1;
                let className = entryInd % 2 === 0 ? "even" : "odd";
                if (pageInd === 0 && entryInd === 0) {
                  className += " first";
                }
                const entryElement = (
                  <Entry key={entry.id} entry={entry} className={className} />
                );

                // Render the scroll sentinel above the last entry in the last page of results so we can begin loading
                // the next page when it comes into view.
                if (isLastPage && isLastEntry) {
                  return (
                    <React.Fragment key={`${entry.id}-withSentinel`}>
                      {renderScrollSentinel()}
                      {entryElement}
                    </React.Fragment>
                  );
                }
                return entryElement;
              })}
            </React.Fragment>
          );
        })}
        {hasMoreEntries && <Loader />}
      </article>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      return <span>Error</span>;
    }
    return renderEntries();
  };

  return (
    <>
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="content-wrapper" aria-busy={isLoading}>
        {renderBody()}
      </div>
      <Footer />
    </>
  );
}
