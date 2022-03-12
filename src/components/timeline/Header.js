import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import { WindowWidthPropType } from "../../hooks/useWindowWidth";

import { STORAGE_URL } from "../../constants/urls";

import Link from "next/link";
import ExternalLink from "../ExternalLink";

const Header = forwardRef(function Header({ windowWidth }, ref) {
  const componentRef = useRef();
  useImperativeHandle(ref && ref.focusRef ? ref.focusRef : null, () => ({
    focus: () => componentRef.current.focus(),
  }));

  const renderLinks = () => (
    <>
      <ul>
        <li>
          <Link href="/what">
            <a>What is web3?</a>
          </Link>
        </li>
        <li>
          <Link href="/glossary">
            <a>Glossary</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About this project</a>
          </Link>
        </li>
        <li>
          <Link href="/contribute">
            <a>Contribute</a>
          </Link>
        </li>
        <li>
          <Link href="/attribution">
            <a>License and attribution</a>
          </Link>
        </li>
      </ul>
    </>
  );

  const renderImage = () => {
    const imageSize = windowWidth === "xl" ? 500 : 300;
    return (
      <Link href="/">
        <a className="logo-image-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="logo"
            src={`${STORAGE_URL}/monkey_${imageSize}.webp`}
            alt="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames."
          />
        </a>
      </Link>
    );
  };

  const renderMobileImageAndLinks = () => (
    <div className="mobile-image-and-links">
      {renderLinks()}
      <div className="mobile-image-wrapper">{renderImage()}</div>
    </div>
  );

  const renderIconLinkContents = (iconClass, iconText) => (
    <>
      <i title={iconText} className={iconClass} aria-hidden={true}></i>
      <span className="sr-only">{iconText}</span>
    </>
  );

  return (
    <header
      className="timeline-page page-header"
      ref={ref && ref.inViewRef ? ref.inViewRef : null}
    >
      <a href="#timeline" className="show-on-focus">
        Skip to timeline
      </a>
      <div className="constrain-width">
        {windowWidth !== "sm" && renderImage()}
        <div className="header-content">
          <h1 ref={componentRef} tabIndex={-1}>
            <Link href="/">
              <a>Web3 is going just great</a>
            </Link>
          </h1>
          <p className="subtitle">
            ...and is definitely not an enormous grift that's pouring lighter
            fluid on our already-smoldering planet.
          </p>
          <p>
            Follow updates on{" "}
            <ExternalLink href="https://twitter.com/web3isgreat">
              Twitter
            </ExternalLink>{" "}
            or with{" "}
            <ExternalLink href="https://web3isgoinggreat.com/feed.xml">
              RSS
            </ExternalLink>
            <i className="fas fa-rss" aria-hidden={true} />
            <br />
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
            </span>{" "}
          </p>
          {windowWidth === "sm" ? renderMobileImageAndLinks() : renderLinks()}
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  windowWidth: WindowWidthPropType,
  nojs: PropTypes.bool,
};

Header.defaultProps = {
  nojs: false,
};

export default Header;
