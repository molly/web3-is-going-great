import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import { WindowWidthPropType } from "../../hooks/useWindowWidth";

import { STORAGE_URL } from "../../constants/urls";

import Link from "next/link";
import ExternalLink from "../ExternalLink";
import MobileNavigation from "../navigation/MobileNavigation";

const Header = forwardRef(function Header(
  { windowWidth, isBrowserRendering, clearAllFiltering },
  ref
) {
  const componentRef = useRef();
  useImperativeHandle(ref && ref.focusRef ? ref.focusRef : null, () => ({
    focus: () => componentRef.current.focus(),
  }));

  const renderMainPageLink = (contents, className = null) => {
    if (clearAllFiltering && isBrowserRendering) {
      return (
        <button className={className} onClick={clearAllFiltering}>
          <span className="sr-only">Clear timeline filters</span>
          {contents}
        </button>
      );
    }
    return (
      <Link href="/" className={className}>
        {contents}
      </Link>
    );
  };

  const renderImage = () => {
    const imageSize = windowWidth === "xl" ? 500 : 300;
    return renderMainPageLink(
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="logo"
        src={`${STORAGE_URL}/monkey_${imageSize}.webp`}
        alt="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames."
      />,
      "logo-image-link"
    );
  };

  const renderIconLinkContents = (iconClass, iconText) => (
    <>
      <i title={iconText} className={iconClass} aria-hidden={true}></i>
      <span className="sr-only">{iconText}</span>
    </>
  );

  const renderLinks = () => (
    <p>
      <span>Created by Molly White </span>
      <span style={{ display: "inline-block" }}>
        <span aria-hidden={true}>(</span>
        <ExternalLink href="https://twitter.com/molly0xFFF">
          {renderIconLinkContents("fa-brands fa-twitter", "Twitter")}
        </ExternalLink>
        <span aria-hidden={true}>, </span>
        <ExternalLink href="https://www.mollywhite.net/">
          {renderIconLinkContents("fas fa-link", "Website")}
        </ExternalLink>
        <span aria-hidden={true}>)</span>
      </span>
    </p>
  );

  const renderMobileImageAndLinks = () => (
    <div className="mobile-image-and-links">
      <div>
        <p>
          <span>Created by Molly White </span>
          <span style={{ display: "inline-block" }}>
            <span aria-hidden={true}>(</span>
            <ExternalLink href="https://twitter.com/molly0xFFF">
              {renderIconLinkContents("fa-brands fa-twitter", "Twitter")}
            </ExternalLink>
            <span aria-hidden={true}>, </span>
            <ExternalLink href="https://www.mollywhite.net/">
              {renderIconLinkContents("fas fa-link", "Website")}
            </ExternalLink>
            <span aria-hidden={true}>)</span>
          </span>
        </p>
      </div>
      <div className="mobile-image-wrapper">{renderImage()}</div>
    </div>
  );

  return (
    <header
      className="timeline-page page-header"
      ref={ref && ref.inViewRef ? ref.inViewRef : null}
    >
      {(windowWidth === "sm" || windowWidth === "xs") && <MobileNavigation />}
      <a href="#timeline" className="show-on-focus">
        Skip to timeline
      </a>
      <div className="constrain-width">
        {!(windowWidth === "sm" || windowWidth === "xs") && renderImage()}
        <div className="header-content">
          <h1 ref={componentRef} tabIndex={-1}>
            {renderMainPageLink(<span>Web3 is Going Just Great</span>)}
          </h1>
          <p className="subtitle">
            ...and is definitely not an enormous grift that's pouring lighter
            fluid on our already smoldering planet.
          </p>
          {windowWidth === "sm" || windowWidth === "xs"
            ? renderMobileImageAndLinks()
            : renderLinks()}
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  windowWidth: WindowWidthPropType,
  nojs: PropTypes.bool,
  isBrowserRendering: PropTypes.bool,
  clearAllFiltering: PropTypes.func,
};

Header.defaultProps = {
  nojs: false,
};

export default Header;
