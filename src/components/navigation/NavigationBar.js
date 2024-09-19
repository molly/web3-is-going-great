import { useRouter } from "next/router";
import { NAVIGATION } from "../../constants/navigation";
import NavigationDropdown from "./NavigationDropdown";
import NavigationLink from "./NavigationLink";

// Only renders for breakpoints >= MD
export default function NavigationBar() {
  const router = useRouter();

  const renderNavigationFromConfig = () =>
    NAVIGATION.map((navItem) => {
      if (Object.prototype.hasOwnProperty.call(navItem, "children")) {
        return <NavigationDropdown key={navItem.key} config={navItem} />;
      }
      return (
        <NavigationLink
          key={navItem.path || navItem.label}
          {...navItem}
          className="navigation-entry"
        />
      );
    });

  return (
    <div className="navigation-bar-wrapper">
      <section className="navigation-bar">
        {router.pathname !== "/" && (
          <NavigationLink className="navigation-entry" path="/" label="Home" />
        )}
        {renderNavigationFromConfig()}
      </section>
    </div>
  );
}

NavigationBar.propTypes = {};
