import React from "react";
import useGA from "../hooks/useGA";

import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";

export default function Suggest() {
  useGA();

  return (
    <>
      <header className="page-header attribution-header">
        <h1>Suggest an addition or change</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
          <p>
            The best and quickest way to suggest an addition or change to this
            timeline is via Github Issue.{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great/issues/new?assignees=&labels=bug%2Ctriage&template=new-entry.yml&title=%5BNEW%5D%3A+">
              <span>Suggest a new entry</span>
            </ExternalLink>
            , or{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great/issues/new?assignees=&labels=&template=change-to-existing-entry.md&title=%5BEDIT%5D">
              suggest a change to an existing entry.
            </ExternalLink>
          </p>
          <p>
            If Github doesn't work for you for some reason, get in touch with me
            through{" "}
            <ExternalLink href="https://twitter.com/molly0xFFF">
              Twitter
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href="https://www.mollywhite.net/contact">
              some other way
            </ExternalLink>
            . Make sure to send me a link to reporting about any event you're
            hoping to see on the timeline!
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
