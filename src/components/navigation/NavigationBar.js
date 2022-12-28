import NavigationDropdown from "./NavigationDropdown";

import { NAVIGATION } from "../../constants/navigation";
import React from "react";
import NavigationLink from "./NavigationLink";

// Only renders for breakpoints >= MD
export default function NavigationBar() {
  const renderNavigationFromConfig = () =>
    NAVIGATION.map((navItem) => {
      if (Object.prototype.hasOwnProperty.call(navItem, "children")) {
        return <NavigationDropdown key={navItem.key} config={navItem} />;
      }
      return (
        <NavigationLink
          key={navItem.path}
          {...navItem}
          className="navigation-entry"
        />
      );
    });

  return (
    <div className="navigation-bar-wrapper">
      <section className="navigation-bar">
        {renderNavigationFromConfig()}
      </section>
    </div>
  );
}

NavigationBar.propTypes = {};
