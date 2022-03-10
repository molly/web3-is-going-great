import CustomHead from "../../components/CustomHead";
import BackBar from "../../components/BackBar";
import Footer from "../../components/Footer";

export default function Notes202203092() {
  return (
    <>
      <CustomHead
        title="Notes – Web3 is going just great"
        description="Further information about a Web3 is Going Just Great entry"
        urlPath="notes/2022-03-09-2"
      />
      <header className="page-header">
        <h1>Notes</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
          <h2>Translation of RockTrader's tweets</h2>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734115007213570"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            I mistakenly deposited 10 BTC (US $385,000) and now I have a
            problem. Thread below.
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734121239977993"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            The broker is well-known in the United States. I made a deposit in
            LTC [Litecoin] to test, I sent US $24 (in LTC), and it gave me an
            error
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734127573291008"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            The next day I see 10 BTC, I get confused with the LTC I was waiting
            for, and I exchange it for USD. When more than $380,000 USD appears
            in my account, I'm surprised by the amount and I panic
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734133273407493"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            In the moment I didn't know what to do. The first thing that
            occurred to me was to exchange them back for BTC, because otherwise
            they could claim I owed them the difference if the price surged
            (after a while it did surge). I also wrote an email to support. I
            managed to buy back 9.8752 BTC.
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734139099295749"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            I received an email that they had credited me $10
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734146053324801"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            But after a few hours I see that the BTC is no longer in my account
            and the worst ending: they want to charge me $3,632.90 USD for
            something, or they will pass the case to a debt collection agency.
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734152646897674"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            I was charged commission on those transactions, and so it didn't
            amount to the original 10 BTC. They used my account to get 10 BTC,
            they operated on my account without authorization.
          </p>
          <p>
            <a
              href="https://twitter.com/rifftrader/status/1501734155406696448"
              rel="noreferrer"
              target="_blank"
              className="padding-right"
            >
              <i className="fa-brands fa-twitter" aria-hidden={true} />
              <span className="sr-only">Tweet link</span>
            </a>
            So far no one at the company has given me an answer and they want me
            to pay for the charges, when they had a serious administrative
            error.
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
