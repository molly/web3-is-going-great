import React from "react";
import Link from "../Link";

export default function Attribution() {
  return (
    <>
      <header className="attribution-header">
        <h1>Attribution</h1>
      </header>
      <div className="content-wrapper">
        <article className="attribution">
          <h3>Monkey illustration created from</h3>
          <ul>
            <li>
              <Link href="https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/5262">
                <span>#5262</span>
              </Link>
              <span> from OpenSea</span>
            </li>
            <li>
              <Link href="https://icons8.com/illustrations/illustration/burgundy-123">
                Earth illustration
              </Link>
              <span> by </span>
              <Link href="https://icons8.com/illustrations/author/603d1fd6123f9916a4db9ee6">
                <span>Irina Molchanova</span>
              </Link>
              <span> from </span>
              <Link href="https://icons8.com/illustrations">
                <span>icons8</span>
              </Link>
            </li>
            <li>
              <Link href="https://icons8.com/illustrations/illustration/burgundy-fire-1">
                Flame illustration
              </Link>
              <span> by </span>
              <Link href="https://icons8.com/illustrations/author/603d1fd6123f9916a4db9ee6">
                <span>Irina Molchanova</span>
              </Link>
              <span> from </span>
              <Link href="https://icons8.com/illustrations">
                <span>icons8</span>
              </Link>
            </li>
          </ul>

          <h3>Icons</h3>
          <ul>
            <li>
              <Link href="https://icons8.com/icon/zq5OEurKP6Ip/robber">
                <span>Robber</span>
              </Link>
              <span> icon by </span>
              <Link href="https://icons8.com">
                <span>Icons8</span>
              </Link>
            </li>
            <li>
              <Link href="https://icons8.com/icon/36931/sun-glasses">
                <span>Sunglasses</span>
              </Link>
              <span> icon by </span>
              <Link href="https://icons8.com">
                <span>Icons8</span>
              </Link>
            </li>
          </ul>

          <h3>Images</h3>
          <ul>
            <li>
              <span>AnubisDAO art from </span>
              <Link href="https://twitter.com/anubisdao">
                <span>the project's Twitter account</span>
              </Link>
            </li>
            <li>
              <span>Bored Ape Yacht Club NFT from </span>
              <Link href="https://twitter.com/calvinbecerra/status/1454328591202721796">
                <span>Calvin Becerra's Twitter account</span>
              </Link>
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
