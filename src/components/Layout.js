import PropTypes from "prop-types";
import clsx from "clsx";
import { useAppState } from "../context/AppContext";

export default function Layout({ children }) {
  const { colorModeOverride, useSansSerif } = useAppState();

  return (
    <main
      className={clsx([
        colorModeOverride ? `use-${colorModeOverride}` : null,
        { "use-sans-serif": useSansSerif },
      ])}
    >
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
