import PropTypes from "prop-types";
import clsx from "clsx";

import { useRouter } from "next/router";
import Link from "next/link";

export default function NavigationLink({
  label,
  path,
  href,
  className,
  ...rest
}) {
  const router = useRouter();
  if (path) {
    return (
      <Link
        href={path}
        className={clsx(
          { "active-navigation-entry": path === router.pathname },
          className
        )}
        {...rest}
      >
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
  className: PropTypes.string,
};
