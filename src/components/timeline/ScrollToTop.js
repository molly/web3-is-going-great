import PropTypes from "prop-types";

export default function ScrollToTop({ scrollToTop }) {
  return (
    <button className="scroll-to-top" onClick={scrollToTop}>
      <i className="fas fa-arrow-up" aria-hidden={true}></i>
      <span className="sr-only">Scroll to top</span>
    </button>
  );
}

ScrollToTop.propTypes = {
  scrollToTop: PropTypes.func.isRequired,
};
