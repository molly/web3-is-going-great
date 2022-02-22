import PropTypes from "prop-types";
import clsx from "clsx";
import { useAppState } from "../context/AppContext";

export default function Layout({ children }) {
  const { useDarkMode, useSansSerif } = useAppState();

  return (
    <main
      className={clsx([
        { "use-sans-serif": useSansSerif, "use-dark": useDarkMode },
      ])}
    >
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
