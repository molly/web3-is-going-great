import PropTypes from "prop-types";
import Link from "next/link";

export default function NavigationLink({ label, path, href, ...rest }) {
  if (path) {
    return (
      <Link href={path} {...rest}>
        {label}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" {...rest}>
        {label}
      </a>
    );
  }
  return null;
}

NavigationLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  href: PropTypes.string,
};
