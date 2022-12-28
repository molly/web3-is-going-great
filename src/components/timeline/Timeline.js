import { Fragment, useCallback, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import useWindowWidth from "../../hooks/useWindowWidth";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";

import { FiltersPropType } from "../../constants/filters";
import {
  getCollectionName,
  removeQueryParamsFromUrl,
  stripHtml,
} from "../../js/utilities";

import Link from "next/link";
import { InView, useInView } from "react-intersection-observer";

import CustomEntryHead from "../CustomEntryHead";
import NavigationBar from "../navigation/NavigationBar";
import Header from "./Header";
import Filters from "./Filters";
import BackBar from "../BackBar";
import Entry from "./Entry";
import FixedAtBottom from "./FixedAtBottom";
import Loader from "../Loader";
import Error from "../Error";
import NoJsNavigation from "../navigation/NoJsNavigation";

export default function Timeline({
  queryResult,
  collection,
  filters,
  glossary,
  griftTotal,
  allCollections,
  selectedEntryFromSearch,
  startAtId,
  setCollection,
  setFilters,
  setSelectedEntryFromSearch,
  clearAllFiltering,
}) {
  const isBrowserRendering = useIsBrowserRendering();
  const windowWidth = useWindowWidth();

  const [currentRunningScamTotal, setCurrentRunningScamTotal] = useState(0);

  const [headerInViewRef, headerInView] = useInView();
  const headerFocusRef = useRef();

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    headerFocusRef.current.focus();
  }, [headerFocusRef]);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = queryResult;

  const hasPreviousEntries = useMemo(
    () =>
      isSuccess &&
      data &&
      data.pages &&
      data.pages.length &&
      data.pages[0] &&
      !!data.pages[0].hasPrev,
    [data, isSuccess]
  );

  const shouldRenderFilterBarAndGriftCounter = useMemo(
    () => !collection && (!startAtId || !hasPreviousEntries),
    [collection, hasPreviousEntries, startAtId]
  );

  const shouldRenderGoToTop = useMemo(() => {
    return (!!startAtId && hasPreviousEntries) || !!selectedEntryFromSearch;
  }, [startAtId, hasPreviousEntries, selectedEntryFromSearch]);

  const collectionDescription = useMemo(
    () =>
      collection
        ? `Entries related to ${getCollectionName(collection, allCollections)}`
        : null,
    [collection, allCollections]
  );

  const maybeRenderNavigation = () => {
    if (!isBrowserRendering) {
      return <NoJsNavigation />;
    } else if (windowWidth !== "xs" && windowWidth !== "sm") {
      return <NavigationBar />;
    } else {
      // In this case, <Header/> handles rendering the nav
      return null;
    }
  };

  const renderHead = () => {
    if (startAtId || collection) {
      return (
        <CustomEntryHead
          entry={data.pages[0].entries[0]}
          collectionDescription={collectionDescription}
        />
      );
    }
    return null;
  };

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
    if (!isBrowserRendering) {
      return (
        <>
          <div className="load-top">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="button" href="/">
              <span>Start from the top</span>
            </a>
          </div>
          <div className="timeline dots" />
        </>
      );
    }
    return (
      <>
        <div className="load-top">
          <button onClick={() => clearAllFiltering(true)}>
            <span>Start from the top</span>
          </button>
        </div>
        <div className="timeline dots" />
      </>
    );
  };

  const renderNoJs = () => {
    if (!isBrowserRendering) {
      const cursor = data.pages[0].entries[data.pages[0].entries.length - 1].id;
      return (
        <p id="noscript">
          No JavaScript? That's cool too! Check out the{" "}
          <Link href={`/web1?cursor=${cursor}&direction=next`}>
            Web&nbsp;1.0
          </Link>{" "}
          version of the site to see more entries.
        </p>
      );
    }
    return null;
  };

  const renderEntries = () => {
    let runningScamTotal = 0;
    return (
      <>
        {shouldRenderGoToTop && renderGoToTop()}
        {renderHead()}
        <article
          id="timeline"
          className={clsx("timeline", {
            "small-top-margin": shouldRenderGoToTop,
          })}
        >
          {data.pages.map((page, pageInd) => {
            const isLastPage = pageInd === data.pages.length - 1;
            return (
              <Fragment key={`page-${pageInd}`}>
                {page.entries.map((entry, entryInd) => {
                  const isLastEntry = entryInd === page.entries.length - 1;
                  let className = entryInd % 2 === 0 ? "even" : "odd";
                  if (pageInd === 0 && entryInd === 0) {
                    className += " first";
                  } else if (stripHtml(entry.body).length < 400) {
                    // Don't want to include the short class on the very first entry or it overlaps
                    className += " short";
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
                      shouldScrollToElement={
                        entry.id === startAtId || entry.readableId == startAtId
                      }
                      glossary={glossary}
                      collection={collection}
                      allCollections={allCollections}
                      setCollection={setCollection}
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
          {hasNextPage && isBrowserRendering && <Loader />}
        </article>
        {renderNoJs()}
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
      {maybeRenderNavigation()}
      <Header
        isBrowserRendering={isBrowserRendering}
        windowWidth={windowWidth}
        clearAllFiltering={clearAllFiltering}
        ref={{ focusRef: headerFocusRef, inViewRef: headerInViewRef }}
      />
      {isBrowserRendering && collection && (
        <BackBar
          customText="All entries"
          backFunction={() => {
            setCollection(null);
            removeQueryParamsFromUrl();
          }}
          titleText={collectionDescription}
        />
      )}
      {isBrowserRendering && shouldRenderFilterBarAndGriftCounter && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          setSelectedEntryFromSearch={setSelectedEntryFromSearch}
          windowWidth={windowWidth}
        />
      )}
      <div
        className="timeline-page content-wrapper"
        aria-busy={isLoading}
        aria-live="polite"
      >
        {renderBody()}
      </div>
      <FixedAtBottom
        headerInView={headerInView}
        shouldRenderGriftCounter={shouldRenderFilterBarAndGriftCounter}
        scrollToTop={scrollToTop}
        runningGriftTotal={currentRunningScamTotal}
        griftTotal={griftTotal}
      />
    </>
  );
}

Timeline.propTypes = {
  queryResult: PropTypes.shape({
    data: PropTypes.object,
    hasNextPage: PropTypes.bool,
    fetchNextPage: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
  }),
  filters: FiltersPropType.isRequired,
  collection: PropTypes.string,
  glossary: PropTypes.object.isRequired,
  griftTotal: PropTypes.number.isRequired,
  allCollections: PropTypes.object.isRequired,
  selectedEntryFromSearch: PropTypes.string,
  startAtId: PropTypes.string,
  setCollection: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setSelectedEntryFromSearch: PropTypes.func.isRequired,
  clearAllFiltering: PropTypes.func.isRequired,
};
