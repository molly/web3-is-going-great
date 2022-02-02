import PropTypes from "prop-types";

export default function Define({ term, id }) {
  return <span className="definition">{term}</span>;
}

Define.propTypes = {
  term: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
