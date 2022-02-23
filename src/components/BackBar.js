import PropTypes from "prop-types";
import Link from "next/link";

export default function BackBar({ customText, titleText, backFunction }) {
  const renderLink = () => {
    const text = (
      <>
        <i
          className="fas fa-arrow-left-long link-icon"
          aria-hidden={true}
          alt=""
        />
        {customText || "Back"}
      </>
    );
    if (!backFunction) {
      return (
        <Link href="/">
          <a className="back-bar-item">{text}</a>
        </Link>
      );
    } else {
      return (
        <button className="back-bar-item" onClick={backFunction}>
          {text}
        </button>
      );
    }
  };

  return (
    <nav className="navigation-bar">
      <div className="contents" style={{ display: "flex" }}>
        {renderLink()}
        {titleText && <h3 className="back-bar-item title-text">{titleText}</h3>}
        {
          titleText && (
            <span className="back-bar-item" />
          ) /* Spacer for proper centering */
        }
      </div>
    </nav>
  );
}

BackBar.propTypes = {
  customText: PropTypes.string,
  backFunction: PropTypes.func,
  titleText: PropTypes.string,
};
