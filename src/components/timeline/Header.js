import { forwardRef, useImperativeHandle, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { WindowWidthPropType } from "../../hooks/useWindowWidth";

import { STORAGE_URL } from "../../constants/urls";

import Link from "next/link";
import ExternalLink from "../ExternalLink";
import NavigationBar from "../navigation/NavigationBar";
import MobileNavigation from "../navigation/MobileNavigation";
import NoJsNavigation from "../navigation/NoJsNavigation";

const Header = forwardRef(function Header(
  { windowWidth, isBrowserRendering, clearAllFiltering },
  ref
) {
  const componentRef = useRef();
  useImperativeHandle(ref && ref.focusRef ? ref.focusRef : null, () => ({
    focus: () => componentRef.current.focus(),
  }));
  const router = useRouter();

  const maybeRenderNavigation = () => {
    if (!isBrowserRendering) {
      return <NoJsNavigation />;
    } else if (windowWidth !== "xs" && windowWidth !== "sm") {
      return <NavigationBar />;
    } else {
      // Rendered within the <header> element in this case
      return null;
    }
  };

  const renderSkipToTimeline = () => {
    if (router.pathname === "/") {
      // Avoid rendering this on 404 pages, etc
      return (
        <a href="#timeline" className="show-on-focus">
          Skip to timeline
        </a>
      );
    }
  };

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

  const renderLinks = () => (
    <>
      <p>
        Follow on{" "}
        <ExternalLink href="https://twitter.com/web3isgreat">
          Twitter
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://indieweb.social/@web3isgreat">
          Mastodon
        </ExternalLink>
        , or <Link href="/feed.xml">RSS</Link>.{" "}
      </p>
      <p>
        Created by{" "}
        <ExternalLink href="https://www.mollywhite.net/">
          Molly White
        </ExternalLink>
        . Subscribe to{" "}
        <ExternalLink href="https://newsletter.mollywhite.net/">
          her newsletter
        </ExternalLink>{" "}
        for weekly recaps.
      </p>
    </>
  );

  const renderMobileImageAndLinks = () => (
    <div className="mobile-image-and-links">
      <div>{renderLinks()}</div>
      <div className="mobile-image-wrapper">{renderImage()}</div>
    </div>
  );

  return (
    <>
      {maybeRenderNavigation()}
      <header
        className="timeline-page page-header"
        ref={ref && ref.inViewRef ? ref.inViewRef : null}
      >
        {(windowWidth === "sm" || windowWidth === "xs") && <MobileNavigation />}
        {renderSkipToTimeline()}
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
    </>
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
