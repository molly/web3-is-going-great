import { useState } from "react";
import { NAVIGATION } from "../../constants/navigation";
import NavigationLink from "./NavigationLink";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        className="mobile-navigation-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-bars" />
      </button>
    );
  } else {
    return (
      <nav className="mobile-navigation-menu">
        <button
          className="mobile-navigation-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-close" />
        </button>
        <ul>
          {NAVIGATION.map((navItem) => {
            if (Object.hasOwn(navItem, "children")) {
              return (
                <li key={navItem.key}>
                  <h4>{navItem.label}</h4>
                  <ul>
                    {navItem.children.map((child) => (
                      <li key={child.path || child.href}>
                        <NavigationLink {...child} />
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li key={navItem.path || navItem.href}>
                <NavigationLink {...navItem} />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
