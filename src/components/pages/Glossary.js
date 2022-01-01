import React from "react";
import useGA from "../../js/hooks/useGA";
import BackBar from "../shared/BackBar";
import ExternalLink from "../shared/ExternalLink";
import Footer from "../shared/Footer";

export default function Glossary() {
  useGA();

  return (
    <>
      <header className="page-header">
        <h1>Glossary</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
          <dl>
            <dt>airdrop</dt>
            <dd>
              a distribution of a cryptocurrency token or coin, usually for
              free, to numerous wallet addresses. Airdrops are primarily
              implemented as a way of gaining attention and new followers,
              resulting in a larger user-base and a wider disbursement of coins.
              (
              <ExternalLink href="https://en.wikipedia.org/wiki/Airdrop_(cryptocurrency)">
                Wikipedia
              </ExternalLink>
              )
            </dd>
            <dt>coin</dt>
            <dd>
              a specific cryptocurrency (e.g. Bitcoin, Ethereum, Dogecoin)
            </dd>
            <dt>dApp / decentralized app</dt>
            <dd>
              a computer application that runs on a decentralized computing
              system (
              <ExternalLink href="https://en.wikipedia.org/wiki/Decentralized_application">
                Wikipedia
              </ExternalLink>
              )
            </dd>
            <dt>DAO / decentralized autonomous organization</dt>
            <dd>
              an organization represented by rules encoded as a computer program
              that is transparent, controlled by the organization members and
              not influenced by a central government (
              <ExternalLink href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
            <dt>DeFi / decentralized finance</dt>
            <dd>
              a blockchain-based form of finance that does not rely on central
              financial intermediaries such as brokerages, exchanges, or banks
              to offer traditional financial instruments, and instead utilizes
              smart contracts on blockchains. Types of DeFi platforms include
              crypto exchanges, loan platforms, investment and savings accounts,
              and insurance providers. (
              <ExternalLink href="https://en.wikipedia.org/wiki/Decentralized_finance">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
            <dt>flash loan</dt>
            <dd>
              unsecured loans that don't require collateral from the borrower.
              Funds are borrowed, used, and returned all within one transaction,
              and they are typically used to provide leverage in arbitrage
              opportunities. They have also become a common entry point for
              hackers to exploit flaws in various DeFi protocols. (
              <ExternalLink href="https://www.radixdlt.com/post/what-is-a-flash-loan">
                Radix
              </ExternalLink>
              )
            </dd>
            <dt>liquidity pool</dt>
            <dd>
              funds locked in a smart contract, which facilitate trading and
              lending in a given exchange (
              <ExternalLink href="https://academy.binance.com/en/articles/what-are-liquidity-pools-in-defi">
                <span>Binance</span>
              </ExternalLink>
              )
            </dd>
            <dt>memecoin or shitcoin</dt>
            <dd>
              cryptocurrency that originated from an Internet meme or has some
              other humorous characteristic. Examples include Dogecoin, Shiba
              Inu, and other dog-themed coins. (
              <ExternalLink href="https://en.wikipedia.org/wiki/Meme_coin">
                Wikipedia
              </ExternalLink>
              )
            </dd>
            <dt>mint</dt>
            <dd>
              "minting" is the process of creating an NFT from the underlying
              asset by creating an entry in a blockchain like Ethereum
            </dd>
            <dt>NFT / non-fungible token</dt>
            <dd>
              a unique and non-interchangeable unit of data stored on a digital
              ledger (blockchain). NFTs can be associated with reproducible
              digital files such as photos, videos, and audio. NFTs use a
              digital ledger to provide a public certificate of authenticity or
              proof of ownership, but it does not restrict the sharing or
              copying of the underlying digital file. (
              <ExternalLink href="https://en.wikipedia.org/wiki/Non-fungible_token">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
            <dt>rug pull</dt>
            <dd>
              when a development team suddenly abandons a project and sells or
              removes all its liquidity (
              <ExternalLink href="https://academy.binance.com/en/glossary/rug-pull">
                <span>Binance</span>
              </ExternalLink>
              )
            </dd>
            <dt>smart contract</dt>
            <dd>
              a computer program or a transaction protocol which is intended to
              automatically execute, control or document legally relevant events
              and actions according to the terms of a contract or an agreement (
              <ExternalLink href="https://en.wikipedia.org/wiki/Smart_contract">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
            <dt>stablecoin</dt>
            <dd>
              cryptocurrencies where the price is designed to be pegged to a
              cryptocurrency, fiat money, or to exchange-traded commodities (
              <ExternalLink href="https://en.wikipedia.org/wiki/Stablecoin">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
            <dt>web3</dt>
            <dd>
              an idea for a version of the Internet that is decentralized and
              based on peer-to-peer technologies such as public blockchains (
              <ExternalLink href="https://en.wikipedia.org/wiki/Web3">
                <span>Wikipedia</span>
              </ExternalLink>
              )
            </dd>
          </dl>
        </article>
      </div>
      <Footer />
    </>
  );
}
