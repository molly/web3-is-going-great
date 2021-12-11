import React from "react";
import PropTypes from "prop-types";

export default function ExternalLink({ children, href }) {
  return (
    <a target="_blank" rel="noreferrer" href={href}>
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
