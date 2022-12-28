import PropTypes from "prop-types";
import useWindowWidth from "../hooks/useWindowWidth";

import NoJsNavigation from "./navigation/NoJsNavigation";
import NavigationBar from "./navigation/NavigationBar";
import MobileNavigation from "./navigation/MobileNavigation";
import clsx from "clsx";
import useIsBrowserRendering from "../hooks/useIsBrowserRendering";

export default function SimpleHeader({ children, className, ...rest }) {
  const isBrowserRendering = useIsBrowserRendering();
  const windowWidth = useWindowWidth();

  return (
    <>
      {!isBrowserRendering && <NoJsNavigation />}
      {isBrowserRendering && windowWidth !== "xs" && windowWidth !== "sm" && (
        <NavigationBar />
      )}
      <header className={clsx("page-header", className)} {...rest}>
        {((isBrowserRendering && windowWidth === "sm") ||
          windowWidth === "xs") && <MobileNavigation />}
        <h1>{children}</h1>
      </header>
    </>
  );
}

SimpleHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
