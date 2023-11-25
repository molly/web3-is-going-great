import PropTypes from "prop-types";
import clsx from "clsx";
import { useAppState } from "../context/AppContext";

export default function Layout({ children }) {
  const { useSansSerif, theme } = useAppState();

  return (
    <main
      className={clsx([
        {
          "use-sans-serif": useSansSerif,
          "use-dark": theme === "dark",
          "use-system": theme === "system",
        },
      ])}
    >
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
