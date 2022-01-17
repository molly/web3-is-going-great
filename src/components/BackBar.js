import PropTypes from "prop-types";
import Link from "next/link";

export default function BackBar({ customText }) {
  return (
    <nav className="navigation-bar">
      <div className="contents">
        <Link href="/">
          <a>
            <i className="fas fa-arrow-left-long" aria-hidden={true} alt="" />{" "}
            {customText || "Back"}
          </a>
        </Link>
      </div>
    </nav>
  );
}

BackBar.propTypes = {
  customText: PropTypes.string,
};
