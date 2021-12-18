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
          <p>Most text was written by Molly White.</p>
          <h3>Additional text and entries contributed by</h3>
          <ul>
            <li>
              <ExternalLink href="https://twitter.com/jpscribbles">
                <span>JP Etcheber</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/VerifiedJoseph">
                <span>Joseph</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/astamos">
                <span>Alex Stamos</span>
              </ExternalLink>
            </li>
          </ul>
          <p>
            Thanks also to anyone who{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great">
              contributed PRs on GitHub
            </ExternalLink>
          </p>
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
              <span>Bored Ape #648 from </span>
              <ExternalLink href="https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/648">
                <span>OpenSea</span>
              </ExternalLink>
            </li>
            <li>
              <span>Bored Ape #2031 from </span>
              <ExternalLink href="https://twitter.com/calvinbecerra/status/1454328591202721796">
                <span>Calvin Becerra's Twitter account</span>
              </ExternalLink>
            </li>
            <li>
              <span>Bored Ape #3547 from </span>
              <ExternalLink href="https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/3547">
                <span>OpenSea</span>
              </ExternalLink>
            </li>
            <li>
              <span>BurgerSwap logo from </span>
              <ExternalLink href="https://github.com/burgerswap-org">
                <span>Github</span>
              </ExternalLink>
            </li>
            <li>
              <span>C.R.E.A.M. Finance logo from </span>
              <ExternalLink href=" https://app.cream.finance/">
                their website
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://twitter.com/CoinDesk/status/1469677423423799302">
                <span>CoinDesk tweet</span>
              </ExternalLink>
            </li>
            <li>
              <span>Constitution image from </span>
              <ExternalLink href="https://fortune.com/2021/11/18/us-constitution-auction-dao-crypto-collective/">
                <i>Fortune</i>
              </ExternalLink>
            </li>
            <li>
              <span>DeFi100 logo from </span>
              <ExternalLink href="https://twitter.com/DEFI100">
                the platform's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>DODO logo from </span>
              <ExternalLink href="https://dydx.exchange/">
                the platform's website
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://opensea.io/assets/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/1961">
                <span>Doodle #1961</span>
              </ExternalLink>
              <span> from OpenSea</span>
            </li>
            <li>
              <span>dYdX logo from </span>
              <ExternalLink href="https://twitter.com/BreederDodo">
                the platform's Twitter account
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html">
                <span>"Everydays — The First 5000 Days"</span>
              </ExternalLink>
              <span>
                {" "}
                from <i>The New York Times</i>
              </span>
            </li>
            <li>
              <ExternalLink href="https://opensea.io/assets/0x233a65b06ef83ccf2fd58832086dd782f9da1642/6946">
                <span>EvolvedApe #6946</span>
              </ExternalLink>
              <span> from OpenSea</span>
            </li>
            <li>
              <span>Kickstarter logo</span>
              <ExternalLink href="https://www.kickstarter.com/">
                <span> from their website</span>
              </ExternalLink>
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
              <span>
                <i>Legacy logo</i> from{" "}
              </span>
              <ExternalLink href="https://kotaku.com/peter-molyneuxs-next-game-is-a-blockchain-business-sim-1848201920">
                <span>
                  <i>Kotaku</i>
                </span>
              </ExternalLink>
            </li>
            <li>
              <span>Litecoin price chart from </span>
              <ExternalLink href="https://mashable.com/article/litecoin-walmart-fake-news">
                <span>
                  <i>Mashable</i>
                </span>
              </ExternalLink>
            </li>
            <li>
              <span>McRib NFT image from </span>
              <ExternalLink href="https://twitter.com/McDonalds/status/1455174998264586243">
                McDonalds' Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>"Melania's Vision" NFT from </span>
              <ExternalLink href="https://decrypt.co/88551/solana-labs-distances-itself-melania-trump-nft">
                Decrypt
              </ExternalLink>
            </li>
            <li>
              <span>"Monkey Jizz" logo from </span>
              <ExternalLink href="https://www.vice.com/en/article/n7nw4k/unbelievable-monkey-jizz-cryptocurrency-turns-out-to-be-a-scam">
                Vice
              </ExternalLink>
            </li>
            <li>
              <span>ON1 #7253 from </span>
              <ExternalLink href="https://opensea.io/assets/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d/7253">
                <span>OpenSea</span>
              </ExternalLink>
            </li>
            <li>
              <span>OpenSea logo from </span>
              <ExternalLink href="https://opensea.io/">
                <span>OpenSea</span>
              </ExternalLink>
            </li>
            <li>
              <span>Paid Network logo from </span>
              <ExternalLink href="https://paidnetwork.com">
                their website
              </ExternalLink>
            </li>
            <li>
              <span>Pancake Bunny logo from </span>
              <ExternalLink href="https://twitter.com/PancakeBunnyFin">
                the project's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>Poly Network logo from </span>
              <ExternalLink href="https://poly.network/">
                their website
              </ExternalLink>
            </li>
            <li>
              <span>Popsicle Finance logo </span>
              <ExternalLink href="https://twitter.com/PopsicleFinance">
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
              <span>Roll logo from </span>
              <ExternalLink href="https://tryroll.com/">
                their website
              </ExternalLink>
            </li>
            <li>
              <span>A Solana Towers NFT from an </span>
              <ExternalLink href="https://web.archive.org/web/20210928192615/https://solanatowers.com/">
                <span>archived version of the project's website</span>
              </ExternalLink>
            </li>
            <li>
              <span>SDOG chart from </span>
              <ExternalLink href="https://cryptobriefing.com/olympus-dao-fork-snowdog-hit-by-90-crash/">
                <i>Crypto Briefing</i>
              </ExternalLink>
            </li>
            <li>
              <span>Seattle Kraken logo from </span>
              <ExternalLink href="https://orangecomet.com/kraken/#mascot-reveal">
                Orange Comet
              </ExternalLink>
            </li>
            <li>
              <span>Spartan Protocol logo </span>
              <ExternalLink href="https://twitter.com/SpartanProtocol">
                the project's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>S.T.A.L.K.E.R. 2 artwork from </span>
              <ExternalLink href="https://twitter.com/stalker_thegame">
                <span>the game's Twitter account</span>
              </ExternalLink>
            </li>
            <li>
              <span>Stan Lee NFT from </span>
              <ExternalLink href="https://orangecomet.com/chakra/">
                <span>Orange Comet</span>
              </ExternalLink>
            </li>
            <li>
              <span>Strawberry iMac from </span>
              <ExternalLink href="https://onlineonly.christies.com/s/birth-wikipedia/lots/2181">
                <span>Christie's</span>
              </ExternalLink>
            </li>
            <li>
              <span>Stormtrooper helmet artwork from </span>
              <ExternalLink href="https://www.ft.com/content/7570bd42-0728-4e7e-b322-be9e5880e3d2">
                <i>Financial Times</i>
              </ExternalLink>
            </li>
            <li>
              <span>Tether logo from </span>
              <ExternalLink href="https://twitter.com/Tether_to">
                the company's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>Thodex logo from </span>
              <ExternalLink href="https://www.cryptoninjas.net/2020/12/28/turkish-crypto-exchange-thodex-now-open-to-users-worldwide">
                CryptoNinjas
              </ExternalLink>
            </li>
            <li>
              <span>Titan coin image from </span>
              <ExternalLink href="https://coinmarketcap.com/currencies/titan-coin/">
                <span>CoinMarketCap</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://solanart.io/search/?token=9tB9mUpxJQ8bSrJvve98RUHNx3x259QZs1jazHX9UrAt">
                <span>TROLLz #5372</span>
              </ExternalLink>
              <span> from Solanart</span>
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
              <span>Uranium Finance logo from </span>
              <ExternalLink href="https://twitter.com/uraniumfinance">
                the platform's Twitter account
              </ExternalLink>
            </li>
            <li>
              <span>USD Coin logo from </span>
              <ExternalLink href="https://www.coinbase.com/price/usdc">
                Coinbase
              </ExternalLink>
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
