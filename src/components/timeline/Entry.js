/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";
import PropTypes from "prop-types";

import { STORAGE_URL } from "../../constants/urls";
import FILTERS from "../../constants/filters";
import ICONS from "../../constants/icons";
import { humanizeDate } from "../../js/utilities";
import { EntryPropType } from "../../js/entry";

import { InView } from "react-intersection-observer";
import Link from "next/link";
import TimelineEntryContent from "./TimelineEntryContent";
import { WindowWidthPropType } from "../../hooks/useWindowWidth";

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
    const perma = window.location.origin + `?id=${id}`;
    window.history.pushState(null, null, perma);
    navigator.clipboard.writeText(perma);
    setShowCopiedPopup(true);
    setTimeout(() => {
      setShowCopiedPopup(false);
    }, 1000);
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
        className={onClick ? "clickable" : null}
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
    const theme = entry.filters.theme
      .map((theme) => FILTERS.theme[theme])
      .sort()
      .join(", ");
    let blockchain, tech;
    if (
      entry.filters &&
      entry.filters.blockchain &&
      entry.filters.blockchain.length
    ) {
      blockchain = `Blockchain: ${entry.filters.blockchain
        .map((bc) => FILTERS.blockchain[bc])
        .sort()
        .join(", ")}`;
    }
    if (entry.filters && entry.filters.tech && entry.filters.tech.length) {
      tech = entry.filters.tech
        .map((tech) => FILTERS.tech[tech])
        .sort()
        .join(", ");
    }
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

  return (
    <div
      className={`timeline-entry ${className}`}
      ref={shouldScrollToElement ? ref : null}
    >
      <div className={`timeline-icon ${entry.color || "purple"}`}>
        {renderIcon()}
      </div>

      <div className="timeline-description">
        <span className="timestamp">
          <time dateTime={entry.date}>{humanizeDate(entry.date)}</time>
        </span>
        <h2>
          <button onClick={() => permalink(entry.id)}>
            <span dangerouslySetInnerHTML={{ __html: entry.title }} />
            <i className="fas fa-link" aria-hidden={true} />
            {showCopiedPopup && <div className="permalink-popup">Copied</div>}
          </button>
        </h2>
        {renderImage(true)}
        <TimelineEntryContent glossary={glossary}>
          {entry.body}
        </TimelineEntryContent>
        {renderLinks()}
        {renderTagsWithSentinel()}
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
