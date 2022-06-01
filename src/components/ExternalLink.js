import PropTypes from "prop-types";

export default function ExternalLink({ children, href, ...rest }) {
  return (
    <a
      target="_blank"
      rel="noopener"
      className="external-link"
      href={href}
      {...rest}
    >
      <span>{children}</span>
    </a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
