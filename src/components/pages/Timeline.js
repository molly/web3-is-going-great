import React, { useCallback, useState } from "react";
import { useInfiniteQuery } from "react-query";
import useGA from "../../js/hooks/useGA";
import useGetIdFromQuery from "../../js/hooks/useGetIdFromQuery";
import useWindowWidth from "../../js/hooks/useWindowWidth";

import { getEntries } from "../../js/functions";
import { EMPTY_FILTERS_STATE } from "../../constants/filters";

import { InView } from "react-intersection-observer";
import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import Footer from "../shared/Footer";
import ScamTotal from "../timeline/ScamTotal";

export default function Timeline() {
  useGA();
  const windowWidth = useWindowWidth();
  const startAtId = useGetIdFromQuery();

  const [filters, setFilters] = useState(EMPTY_FILTERS_STATE);

  const getFilteredEntries = useCallback(
    ({ pageParam = null }) => {
      return getEntries({ ...filters, cursor: pageParam, startAtId });
    },
    [filters, startAtId]
  );

  const { data, hasNextPage, fetchNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(["entries", filters], getFilteredEntries, {
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

  const [currentRunningScamTotal, setCurrentRunningScamTotal] = useState(0);

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

  const renderGoToTop = () => {
    return (
      <>
        <div className="load-top">
          <button
            onClick={() => (window.location.href = window.location.origin)}
          >
            <span>Start from the top</span>
          </button>
        </div>
        <div className="timeline dots" />
      </>
    );
  };

  const renderEntries = () => {
    let runningScamTotal = 0;
    return (
      <>
        {startAtId && renderGoToTop()}
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
                  if (entry.scamTotal) {
                    runningScamTotal += entry.scamTotal;
                  }

                  const entryElement = (
                    <Entry
                      key={entry.id}
                      entry={entry}
                      className={className}
                      windowWidth={windowWidth}
                      runningScamTotal={runningScamTotal}
                      currentRunningScamTotal={currentRunningScamTotal}
                      setCurrentRunningScamTotal={setCurrentRunningScamTotal}
                      shouldScrollToElement={entry.id === startAtId}
                    />
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
          {hasNextPage && <Loader />}
        </article>
      </>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      return <Error />;
    }
    return renderEntries();
  };

  return (
    <>
      <Header windowWidth={windowWidth} />
      {!startAtId && <Filters filters={filters} setFilters={setFilters} />}
      <div className="timeline-page content-wrapper" aria-busy={isLoading}>
        {renderBody()}
      </div>
      {!startAtId && <ScamTotal total={currentRunningScamTotal} />}
      <Footer />
    </>
  );
}
