import React from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../ExternalLink";

export default function Attribution() {
  return (
    <>
      <header className="page-header attribution-header">
        <h1>Attribution</h1>
      </header>
      <nav className="navigation-bar">
        <div className="contents">
          <Link to="/">
            <i className="fas fa-arrow-left-long" aria-hidden={true} alt="" />{" "}
            Back
          </Link>
        </div>
      </nav>
      <div className="content-wrapper">
        <article className="attribution">
          <h3>Monkey illustration created from</h3>
          <ul>
            <li>
              <ExternalLink href="https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/5262">
                <span>#5262</span>
              </ExternalLink>
              <span> from OpenSea</span>
            </li>
            <li>
              <ExternalLink href="https://icons8.com/illustrations/illustration/burgundy-123">
                Earth illustration
              </ExternalLink>
              <span> by </span>
              <ExternalLink href="https://icons8.com/illustrations/author/603d1fd6123f9916a4db9ee6">
                <span>Irina Molchanova</span>
              </ExternalLink>
              <span> from </span>
              <ExternalLink href="https://icons8.com/illustrations">
                <span>icons8</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://icons8.com/illustrations/illustration/burgundy-fire-1">
                Flame illustration
              </ExternalLink>
              <span> by </span>
              <ExternalLink href="https://icons8.com/illustrations/author/603d1fd6123f9916a4db9ee6">
                <span>Irina Molchanova</span>
              </ExternalLink>
              <span> from </span>
              <ExternalLink href="https://icons8.com/illustrations">
                <span>icons8</span>
              </ExternalLink>
            </li>
          </ul>

          <h3>Icons</h3>
          <ul>
            <li>
              <ExternalLink href="https://icons8.com/icon/93275/delete-message">
                <span>Delete Message</span>
              </ExternalLink>
              <span> icon by </span>
              <ExternalLink href="https://icons8.com">
                <span>Icons8</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://icons8.com/icon/zq5OEurKP6Ip/robber">
                <span>Robber</span>
              </ExternalLink>
              <span> icon by </span>
              <ExternalLink href="https://icons8.com">
                <span>Icons8</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://icons8.com/icon/9grWu5NGDWPh/rug">
                <span>Rug</span>
              </ExternalLink>
              <span> icon by </span>
              <ExternalLink href="https://icons8.com">
                <span>Icons8</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://icons8.com/icon/36931/sun-glasses">
                <span>Sunglasses</span>
              </ExternalLink>
              <span> icon by </span>
              <ExternalLink href="https://icons8.com">
                <span>Icons8</span>
              </ExternalLink>
            </li>
          </ul>

          <h3>Images</h3>
          <ul>
            <li>
              <span>AnubisDAO art from </span>
              <ExternalLink href="https://twitter.com/anubisdao">
                <span>the project's Twitter account</span>
              </ExternalLink>
            </li>
            <li>
              <span>Bored Ape Yacht Club NFT from </span>
              <ExternalLink href="https://twitter.com/calvinbecerra/status/1454328591202721796">
                <span>Calvin Becerra's Twitter account</span>
              </ExternalLink>
            </li>
            <li>
              <span>McRib NFT image from </span>
              <ExternalLink href="https://twitter.com/McDonalds/status/1455174998264586243">
                McDonalds' Twitter account
              </ExternalLink>
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
