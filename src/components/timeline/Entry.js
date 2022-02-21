/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";
import { WindowWidthPropType } from "../../hooks/useWindowWidth";
import clsx from "clsx";

import { STORAGE_URL } from "../../constants/urls";
import FILTERS from "../../constants/filters";
import ICONS from "../../constants/icons";
import COLLECTIONS from "../../constants/collections";

import {
  humanizeDate,
  humanizeList,
  sentenceCase,
  getPermalink,
} from "../../js/utilities";

import { InView } from "react-intersection-observer";
import Link from "next/link";
import TimelineEntryContent from "./TimelineEntryContent";

export default function Entry({
  entry,
  className,
  windowWidth,
  glossary,
  runningScamTotal,
  currentRunningScamTotal,
  setCurrentRunningScamTotal,
  shouldScrollToElement,
}) {
  const ref = useRef();
  const router = useRouter();
  const isBrowserRendering = useIsBrowserRendering();

  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    if (ref.current && isBrowserRendering) {
      const rect = ref.current.getBoundingClientRect();
      window.scrollTo(0, rect.y - 70);
    }
  }, [ref, isBrowserRendering]);

  const onEsc = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowLightbox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [onEsc]);

  const permalink = (id) => {
    const newParams = { ...router.query, id };
    router.push({ query: newParams }, null, { shallow: true });
    const perma = getPermalink(newParams);
    navigator.clipboard.writeText(perma);
    setShowCopiedPopup(true);
    setTimeout(() => {
      setShowCopiedPopup(false);
    }, 1000);
  };

  const getTagString = (category) => {
    if (
      entry.filters &&
      entry.filters[category] &&
      entry.filters[category].length
    ) {
      return entry.filters[category]
        .map((key) => FILTERS[category][key])
        .sort()
        .join(", ");
    }
    return null;
  };

  const renderIcon = () => {
    if (entry.faicon) {
      return (
        <div className="icon-wrapper">
          <i className={`fas fa-${entry.faicon}`} aria-hidden="true"></i>
        </div>
      );
    } else if (entry.icon) {
      return (
        <div className="icon-wrapper">
          <img
            src={`${STORAGE_URL}/icons/${ICONS[entry.icon]}`}
            alt="" // Decorative, hidden to screenreaders
            aria-hidden="true"
            layout="fill"
          />
        </div>
      );
    }
    return null;
  };

  const renderTimestampAndLinkIcons = () => {
    return (
      <div className="timestamp-and-link-icons">
        <span className="timestamp">
          <time dateTime={entry.date}>{humanizeDate(entry.date)}</time>
        </span>
        <ul className="entry-link-icons">
          <li>
            {showCopiedPopup && <div className="permalink-popup">Copied</div>}
            <button onClick={() => permalink(entry.id)}>
              <i className="fas fa-link" aria-hidden={true} />
              <span className="sr-only">Permalink</span>
            </button>
          </li>
          {"tweetId" in entry && (
            <li>
              <a
                href={`https://twitter.com/web3isgreat/status/${entry.tweetId}`}
                target="_blank"
                rel="noopener"
                title="Tweet link"
              >
                <i className="fa-brands fa-twitter" aria-hidden={true} />
                <span className="sr-only">Tweet link</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  };

  const renderTitle = () => {
    if (isBrowserRendering) {
      return (
        <h2>
          <button onClick={() => permalink(entry.id)}>
            <span dangerouslySetInnerHTML={{ __html: entry.title }} />
          </button>
        </h2>
      );
    } else {
      const linkSuffix = router.route.startsWith("/web1")
        ? `#${entry.id}`
        : `?id=${entry.id}`;
      return (
        <h2>
          <Link href={`${router.route}${linkSuffix}`}>
            <a id={entry.id}>
              <span dangerouslySetInnerHTML={{ __html: entry.title }} />
            </a>
          </Link>
        </h2>
      );
    }
  };

  const renderImageElement = (onClick = null) => {
    if (!entry.image) {
      return null;
    }

    return (
      <img
        src={`${STORAGE_URL}/entryAssets/${entry.image.src}`}
        alt={entry.image.alt}
        layout="fill"
        onClick={onClick}
        className={clsx([{ clickable: !!onClick }, entry.image.class])}
      />
    );
  };

  const renderImageCaption = () => {
    if (entry.image && entry.image.caption) {
      return (
        <>
          <span
            className="caption"
            dangerouslySetInnerHTML={{ __html: entry.image.caption }}
          />{" "}
          <span className="attribution-link">
            <Link href="/attribution">
              <a>(attribution)</a>
            </Link>
          </span>
        </>
      );
    }
    return null;
  };

  const renderImage = () => {
    const isLogo =
      entry.image &&
      entry.image.caption &&
      entry.image.caption.toLowerCase().includes("logo");

    if (entry.image && (windowWidth !== "sm" || !isLogo)) {
      return (
        <div className="captioned-image image-right">
          {renderImageElement(() => setShowLightbox(true))}
          {renderImageCaption()}
        </div>
      );
    }
    return null;
  };

  const renderLightbox = () => {
    if (entry.image && showLightbox) {
      return (
        <div className="lightbox-container">
          <button onClick={() => setShowLightbox(false)}>
            <i className="fas fa-xmark" aria-hidden={true}></i>
            <span className="sr-only">Close lightbox</span>
          </button>
          <div className="image-wrapper">{renderImageElement()}</div>
          <div className="caption-wrapper">{renderImageCaption()}</div>
        </div>
      );
    }
  };

  const renderLinks = () => {
    if (entry.links && entry.links.length) {
      return (
        <ul>
          {entry.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span dangerouslySetInnerHTML={{ __html: link.linkText }} />
              </a>
              {link.extraText && (
                <span dangerouslySetInnerHTML={{ __html: link.extraText }} />
              )}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const renderTags = () => {
    const theme = getTagString("theme");
    const blockchainTagString = getTagString("blockchain");
    const blockchain = blockchainTagString
      ? `Blockchain: ${blockchainTagString}`
      : null;
    const tech = getTagString("tech");
    return (
      <div className="tags">
        <div className="tag-list theme">
          <span className="sr-only">Theme tags: </span>
          {theme}
        </div>
        <div className="tag-group-right">
          {blockchain && (
            <div className="tag-list">
              <span className="sr-only">Blockchain tags: </span>
              <span>{blockchain}</span>
            </div>
          )}
          {tech && (
            <div className="tag-list">
              <span className="sr-only">Tech tags: </span>
              <span>{tech}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTagsWithSentinel = () => {
    if (!setCurrentRunningScamTotal) {
      return renderTags();
    }
    return (
      <InView
        className="clearfix"
        threshold={1}
        onChange={(inView) => {
          if (inView && runningScamTotal !== currentRunningScamTotal) {
            setCurrentRunningScamTotal(runningScamTotal);
          }
        }}
      >
        {renderTags()}
      </InView>
    );
  };

  const renderCollection = () => {
    if ("collection" in entry) {
      return (
        <span>
          Other entries related to{" "}
          {humanizeList(
            entry.collection.map((coll) => (
              <Link key={coll} href={`/?collection=${coll}`}>
                <a>
                  {coll in COLLECTIONS
                    ? COLLECTIONS[coll]
                    : sentenceCase(coll.replace("-", " "))}
                </a>
              </Link>
            )),
            { exclusive: true }
          )}
        </span>
      );
    }
    return <span />;
  };

  const renderFooterLinks = () => {
    if ("tweetId" in entry) {
      return (
        <a href={`https://twitter.com/web3isgreat/status/${entry.tweetId}`}>
          <i
            title="Tweet link"
            className="fa-brands fa-twitter"
            aria-hidden={true}
          ></i>
          <span className="sr-only">Tweet link</span>
        </a>
      );
    }
    return null;
  };

  const renderCollectionAndLinks = () => {
    if ("collection" in entry || "tweetId" in entry) {
      return (
        <div className="collection-row">
          {renderCollection()}
          {renderFooterLinks()}
        </div>
      );
    }
    return null;
  };

  const renderFooterContent = () => {
    return (
      <div className="entry-footer">
        {renderCollectionAndLinks()}
        {renderTagsWithSentinel()}
      </div>
    );
  };

  return (
    <div
      className={`timeline-entry ${className}`}
      ref={shouldScrollToElement ? ref : null}
    >
      <div className={`timeline-icon ${entry.color || "purple"}`}>
        {renderIcon()}
      </div>

      <div className="timeline-description">
        <div className="entry-wrapper">
          {renderTimestampAndLinkIcons()}
          {renderTitle()}
          {renderImage(true)}
          <TimelineEntryContent glossary={glossary}>
            {entry.body}
          </TimelineEntryContent>
          {renderLinks()}
        </div>
        {renderFooterContent()}
      </div>
      {renderLightbox()}
    </div>
  );
}

Entry.propTypes = {
  className: PropTypes.string,
  entry: EntryPropType,
  windowWidth: WindowWidthPropType,
  glossary: PropTypes.object.isRequired,
  runningScamTotal: PropTypes.number,
  currentRunningScamTotal: PropTypes.number,
  setCurrentRunningScamTotal: PropTypes.func,
  shouldScrollToElement: PropTypes.bool,
};

Entry.defaultProps = {
  runningScamTotal: 0,
};
