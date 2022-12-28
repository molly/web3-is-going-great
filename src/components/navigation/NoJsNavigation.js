import { Fragment } from "react";
import { NAVIGATION } from "../../constants/navigation";
import NavigationLink from "./NavigationLink";

export default function NoJsNavigation() {
  const renderLink = (navItem) => {
    return (
      <NavigationLink
        key={navItem.path || navItem.href}
        className="navigation-entry"
        {...navItem}
        label={navItem.short || navItem.label}
      />
    );
  };

  const renderNavigationFromConfig = () =>
    NAVIGATION.map((navItem) => {
      if (Object.prototype.hasOwnProperty.call(navItem, "children")) {
        return (
          <Fragment key={navItem.key}>
            {navItem.children.map((child) => renderLink(child))}
          </Fragment>
        );
      }
      return renderLink(navItem);
    });

  return (
    <nav className="no-js-navigation navigation-bar-wrapper">
      <section className="navigation-bar">
        <NavigationLink className="navigation-entry" path="/" label="Home" />
        {renderNavigationFromConfig()}
      </section>
    </nav>
  );
}

NoJsNavigation.propTypes = {};
