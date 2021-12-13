import React from "react";
import useGA from "../../js/useGA";
import BackBar from "../shared/BackBar";
import ExternalLink from "../shared/ExternalLink";
import Footer from "../shared/Footer";

export default function Attribution() {
  useGA();

  return (
    <>
      <header className="page-header attribution-header">
        <h1>Attribution</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
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
            <li>
              <ExternalLink href="https://icons8.com/icon/95327/wtf">
                <span>WTF</span>
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
              <span>BadgerDAO logo from </span>
              <ExternalLink href="https://twitter.com/BadgerDAO">
                the organization's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>Bored Ape Yacht Club NFT from </span>
              <ExternalLink href="https://twitter.com/calvinbecerra/status/1454328591202721796">
                <span>Calvin Becerra's Twitter account</span>
              </ExternalLink>
            </li>
            <li>
              <span>BurgerSwap logo from </span>
              <ExternalLink href="https://github.com/burgerswap-org">
                <span>Github</span>
              </ExternalLink>
            </li>
            <li>
              <span>DODO logo from </span>
              <ExternalLink href="https://twitter.com/BreederDodo">
                the platform's Twitter account
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://opensea.io/assets/0x233a65b06ef83ccf2fd58832086dd782f9da1642/6946">
                <span>EvolvedApe #6946</span>
              </ExternalLink>
              <span> from OpenSea</span>
            </li>
            <li>
              <ExternalLink href="https://solsea.io/nft/92g5SJy9CxJWmirMEkwEvYcMW9ajFAkwNqGotUsUvvbX">
                <span>iconic 15</span>
              </ExternalLink>
              <span> from SolSea</span>
            </li>
            <li>
              <span>Jay Pegs Auto Mart screenshot from </span>
              <ExternalLink href="https://jaypegsautomart.com/">
                <span>the project website</span>
              </ExternalLink>
            </li>
            <li>
              <span>McRib NFT image from </span>
              <ExternalLink href="https://twitter.com/McDonalds/status/1455174998264586243">
                McDonalds' Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>"Monkey Jizz" logo from </span>
              <ExternalLink href="https://www.vice.com/en/article/n7nw4k/unbelievable-monkey-jizz-cryptocurrency-turns-out-to-be-a-scam">
                Vice
              </ExternalLink>
            </li>
            <li>
              <span>Pancake Bunny logo </span>
              <ExternalLink href="https://twitter.com/PancakeBunnyFin">
                the project's Twitter account
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://foundation.app/@VincentVanDough/~/107380">
                <span>"Right Click Save This" NFT</span>
              </ExternalLink>
              <span> from Foundation</span>
            </li>
            <li>
              A Solana Towers NFT from an{" "}
              <ExternalLink href="https://web.archive.org/web/20210928192615/https://solanatowers.com/">
                <span>archived version of the project's website</span>
              </ExternalLink>
            </li>
            <li>
              <span>Spartan Protocol logo </span>
              <ExternalLink href="https://twitter.com/SpartanProtocol">
                the project's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>Titan coin image from </span>
              <ExternalLink href="https://coinmarketcap.com/currencies/titan-coin/">
                <span>CoinMarketCap</span>
              </ExternalLink>
            </li>
            <li>
              <span>Turtledex logo from </span>
              <ExternalLink href="https://twitter.com/Turtledex1">
                <span>Twitter</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.kotaku.com.au/2021/12/we-live-in-hell-and-this-ubisoft-nft-that-requires-you-to-play-600-hours-of-ghost-recon-is-proof/">
                <span>Ubisoft's "Wolf Enhanced Helmet A" NFT</span>
              </ExternalLink>
              <span> from Kotaku AU</span>
            </li>
            <li>
              <span>
                <i>Wolf Game</i> logo from{" "}
              </span>
              <ExternalLink href="https://twitter.com/wolfdotgame">
                the project's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>xToken logo from </span>
              <ExternalLink href="https://twitter.com/xtokenmarket">
                the platform's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>yearn.finance logo from </span>
              <ExternalLink href="https://twitter.com/iearnfinance">
                the platform's Twitter account
              </ExternalLink>
            </li>
          </ul>
        </article>
      </div>
      <Footer />
    </>
  );
}
