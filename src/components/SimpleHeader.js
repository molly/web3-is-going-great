import PropTypes from "prop-types";
import useWindowWidth from "../hooks/useWindowWidth";

import NavigationBar from "./navigation/NavigationBar";
import MobileNavigation from "./navigation/MobileNavigation";
import clsx from "clsx";

export default function SimpleHeader({ children, className, ...rest }) {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth !== "xs" && windowWidth !== "sm" && <NavigationBar />}
      <header className={clsx("page-header", className)} {...rest}>
        {(windowWidth === "sm" || windowWidth === "xs") && <MobileNavigation />}
        <h1>{children}</h1>
      </header>
    </>
  );
}

SimpleHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
