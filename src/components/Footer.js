import Link from "next/link";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="constrain-width">
        <p>
          Text is licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
          >
            Creative Commons Attribution 3.0 Unported License
          </a>
          . All attribution can be found on the{" "}
          <Link href="/attribution">
            <a>attribution</a>
          </Link>{" "}
          page.
        </p>
        <p>
          <a href="https://github.com/molly/web3-is-going-great">Source code</a>{" "}
          |{" "}
          <Link href="/contribute">
            <a>Contribute</a>
          </Link>
        </p>
      </div>
    </footer>
  );
}
