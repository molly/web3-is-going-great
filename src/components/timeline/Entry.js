import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { STORAGE_URL } from "../../constants/urls";
import FILTERS from "../../constants/filters";
import ICONS from "../../constants/icons";
import { humanizeDate, isWrappedInParagraphTags } from "../../js/utilities";
import { EntryPropType } from "../../js/entry";
import InView from "react-intersection-observer";

export default function Entry({
  entry,
  className,
  windowWidth,
  runningScamTotal,
  currentRunningScamTotal,
  setCurrentRunningScamTotal,
  shouldScrollToElement,
}) {
  const ref = useRef();

  const [showCopiedPopup, setShowCopiedPopup] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [ref]);

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
      return <i className={`fas fa-${entry.faicon}`} aria-hidden="true"></i>;
    } else if (entry.icon) {
      return (
        <div className="icon-wrapper">
          <img
            src={`${STORAGE_URL}/icons/${ICONS[entry.icon]}`}
            alt="" // Decorative, hidden to screenreaders
            aria-hidden="true"
          />
        </div>
      );
    }
    return null;
  };

  const renderImageElement = () => {
    if (!entry.image) {
      return null;
    }

    const imageEl = (
      <img
        src={`${STORAGE_URL}/entryAssets/${entry.image.src}`}
        alt={entry.image.alt}
      />
    );
    if (entry.image.link) {
      return (
        <a href={entry.image.link} target="_blank" rel="noreferrer">
          {imageEl}
        </a>
      );
    }
    return imageEl;
  };

  const renderImageCaption = () => {
    if (entry?.image?.caption) {
      return (
        <>
          <span
            className="caption"
            dangerouslySetInnerHTML={{ __html: entry.image.caption }}
          />{" "}
          <span className="attribution-link">
            <a href="/attribution">(attribution)</a>
          </span>
        </>
      );
    }
    return null;
  };

  const renderImage = () => {
    const isLogo =
      entry.image?.caption &&
      entry.image.caption.toLowerCase().includes("logo");

    if (entry.image && (windowWidth !== "sm" || !isLogo)) {
      return (
        <div className="captioned-image image-right">
          {renderImageElement()}
          {renderImageCaption()}
        </div>
      );
    }
    return null;
  };

  const renderBody = () => {
    const body = <span dangerouslySetInnerHTML={{ __html: entry.body }} />;
    return isWrappedInParagraphTags(entry.body) ? body : <p>{body}</p>;
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
    if (entry.filters?.blockchain?.length) {
      blockchain = `Blockchain: ${entry.filters.blockchain
        .map((bc) => FILTERS.blockchain[bc])
        .sort()
        .join(", ")}`;
    }
    if (entry.filters?.tech?.length) {
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
              <span className="sr-only">Tec tags: </span>
              <span>{tech}</span>
            </div>
          )}
        </div>
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
        {renderImage()}
        {renderBody()}
        {renderLinks()}
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
      </div>
    </div>
  );
}

Entry.propTypes = {
  className: PropTypes.string,
  entry: EntryPropType,
  windowWidth: PropTypes.oneOf(["sm", "md", "lg"]),
  runningScamTotal: PropTypes.number.isRequired,
  currentRunningScamTotal: PropTypes.number.isRequired,
  setCurrentRunningScamTotal: PropTypes.func.isRequired,
  shouldScrollToElement: PropTypes.bool.isRequired,
};
