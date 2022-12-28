import PropTypes from "prop-types";
import clsx from "clsx";

import { useSelect } from "downshift";
import NavigationLink from "./NavigationLink";

export default function NavigationDropdown({ config }) {
  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getToggleButtonProps,
    getItemProps,
  } = useSelect({
    id: `navigation-dropdown-${config.key}`,
    items: config.children,
    ItemClick: () => {},
  });

  return (
    <div className="navigation-dropdown-wrapper">
      <div
        className="navigation-entry navigation-dropdown-toggle"
        {...getToggleButtonProps()}
      >
        <span className="navigation-dropdown-toggle-label">{config.label}</span>
        <i className="fas fa-angle-down" aria-hidden={true}></i>
      </div>
      <ul {...getMenuProps()} className="navigation-menu">
        {isOpen &&
          config.children.map((child, index) => (
            <li
              key={child.path || child.href}
              className={clsx({
                "active-menu-item": highlightedIndex === index,
              })}
              {...getItemProps({ item: child, index })}
            >
              <NavigationLink {...child} />
            </li>
          ))}
      </ul>
    </div>
  );
}

NavigationDropdown.propTypes = {
  config: PropTypes.exact({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string,
        href: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
