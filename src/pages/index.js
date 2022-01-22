import { Fragment, useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useInfiniteQuery } from "react-query";
import useGA from "../hooks/useGA";
import useWindowWidth from "../hooks/useWindowWidth";
import useIsBrowserRendering from "../hooks/useIsBrowserRendering";

import { getEntries } from "../db/entries";
import { EMPTY_FILTERS_STATE } from "../constants/filters";

import Link from "next/link";
import { InView, useInView } from "react-intersection-observer";
import CustomEntryHead from "../components/CustomEntryHead";
import Header from "../components/timeline/Header";
import Filters from "../components/timeline/Filters";
import Entry from "../components/timeline/Entry";
import Loader from "../components/Loader";
import Error from "../components/Error";
import ScrollToTop from "../components/timeline/ScrollToTop";
import ScamTotal from "../components/timeline/ScamTotal";
import { EntryPropType } from "../js/entry";

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
  return { props };
}

export default function Timeline({ firstEntries, startAtId }) {
  useGA();
  const isBrowserRendering = useIsBrowserRendering();
  const windowWidth = useWindowWidth();

  const [filters, setFilters] = useState(EMPTY_FILTERS_STATE);
  const [currentRunningScamTotal, setCurrentRunningScamTotal] = useState(0);

  const [headerInViewRef, headerInView] = useInView();
  const headerFocusRef = useRef();

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    headerFocusRef.current.focus();
  }, [headerFocusRef]);

  const getFilteredEntries = useCallback(
    ({ pageParam = null }) => {
      return getEntries({ ...filters, cursor: pageParam });
    },
    [filters]
  );

  const { data, hasNextPage, fetchNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(["entries", filters], getFilteredEntries, {
      initialData: { pages: [firstEntries], pageParams: [undefined] },
      refetchOnMount: false,
      getNextPageParam: (lastPage) => {
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

  const renderScrollSentinel = () => {
    return (
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
  };

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
        {startAtId && <CustomEntryHead entry={data.pages[0].entries[0]} />}
        <article className="timeline">
          {data.pages.map((page, pageInd) => {
            const isLastPage = pageInd === data.pages.length - 1;
            return (
              <Fragment key={`page-${pageInd}`}>
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
                      <Fragment key={`${entry.id}-withSentinel`}>
                        {renderScrollSentinel()}
                        {entryElement}
                      </Fragment>
                    );
                  }
                  return entryElement;
                })}
              </Fragment>
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

  const renderNoJs = () => {
    if (!isBrowserRendering) {
      return (
        <p id="noscript">
          No JavaScript? That's cool too! Check out the{" "}
          <Link href="/web1">
            <a>Web&nbsp;1.0</a>
          </Link>{" "}
          version of this site.
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <Header
        windowWidth={windowWidth}
        ref={{ focusRef: headerFocusRef, inViewRef: headerInViewRef }}
      />
      {!startAtId && <Filters filters={filters} setFilters={setFilters} />}
      <div
        className="timeline-page content-wrapper"
        aria-busy={isLoading}
        aria-live="polite"
      >
        {renderNoJs()}
        <div style={{ display: isBrowserRendering ? "initial" : "none" }}>
          {renderBody()}
        </div>
      </div>
      <div className="fix-at-bottom">
        {!headerInView && <ScrollToTop scrollToTop={scrollToTop} />}
        {!startAtId && <ScamTotal total={currentRunningScamTotal} />}
      </div>
    </>
  );
}

Timeline.propTypes = {
  firstEntries: PropTypes.shape({
    entries: PropTypes.arrayOf(EntryPropType).isRequired,
    hasMore: PropTypes.bool.isRequired,
  }).isRequired,
  startAtId: PropTypes.string,
};
