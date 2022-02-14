import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useDebounce } from "use-debounce";
import { useCombobox } from "downshift";

import { search as searchEntries } from "../../db/searchEntries";
import {
  humanizeDate,
  truncateToNearestWord,
  updateUrlWithQueryParam,
} from "../../js/utilities";
import FILTERS from "../../constants/filters";

const MINIMUM_SEARCH_LENGTH = 3;
const BODY_SNIPPET_LENGTH = 200;

function stateReducer(state, actionAndChanges) {
  const { type, changes } = actionAndChanges;
  switch (type) {
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
      // Don't change the input value on selection so people can
      // return to the same query without retyping it. Also close the menu.
      return {
        ...changes,
        inputValue: state.inputValue,
      };
    default:
      return changes;
  }
}

export default function Search({ filters, setSelectedEntryFromSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
  } = useCombobox({
    stateReducer,
    items: items,
    itemToString: (item) => (item ? item.title : null),
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedEntryFromSearch(selectedItem.id);
      // Write the URL so people can permalink easily
      updateUrlWithQueryParam("id", selectedItem.id);
    },
  });

  useEffect(() => {
    if (debouncedSearchTerm.length >= MINIMUM_SEARCH_LENGTH) {
      setIsSearching(true);
      searchEntries(debouncedSearchTerm, filters).then((results) => {
        setIsSearching(false);
        setItems(results.hits);
      });
    } else {
      setItems([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, filters]);

  const renderEntryBodySnippet = (item) => {
    const itemBody = item._highlightResult.body;
    let snippet;
    if (itemBody.matchLevel === "none") {
      // Matched word was in title, just show the first bit of the snippet
      snippet = truncateToNearestWord(itemBody.value, BODY_SNIPPET_LENGTH);
    } else {
      let highlightedLocation = itemBody.value.indexOf("<em>");
      if (highlightedLocation < 50) {
        // The highlighted word is towards the beginning, so no need to trim from the start
        snippet = truncateToNearestWord(itemBody.value, BODY_SNIPPET_LENGTH);
      } else if (itemBody.value.length - highlightedLocation < 150) {
        snippet =
          "&#8230;" +
          truncateToNearestWord(
            itemBody.value,
            BODY_SNIPPET_LENGTH,
            itemBody.value.length - 150
          );
      } else {
        snippet =
          "&#8230;" +
          truncateToNearestWord(
            itemBody.value,
            BODY_SNIPPET_LENGTH,
            highlightedLocation - 50
          );
      }
    }
    return <span dangerouslySetInnerHTML={{ __html: snippet }} />;
  };

  const renderMenuContents = () => {
    if (items.length) {
      return items.map((item, index) => (
        <li
          className={clsx("search-result", {
            highlighted: highlightedIndex === index,
          })}
          key={item.id}
          {...getItemProps({ item, index })}
        >
          <div
            className="result-title"
            dangerouslySetInnerHTML={{
              __html: item._highlightResult.title.value,
            }}
          />
          <div className="timestamp">
            <time dateTime={item.date}>{humanizeDate(item.date)}</time>
          </div>
          <div className="result-body">{renderEntryBodySnippet(item)}</div>
        </li>
      ));
    } else if (searchTerm.length < MINIMUM_SEARCH_LENGTH) {
      const charactersNeeded = MINIMUM_SEARCH_LENGTH - searchTerm.length;
      return (
        <li className="search-help">{`Type ${charactersNeeded} more character${
          charactersNeeded === 1 ? "" : "s"
        } to search`}</li>
      );
    } else if (isSearching || debouncedSearchTerm !== searchTerm) {
      return <li className="search-help">Searching...</li>;
    }
    return <li className="search-help">No results</li>;
  };

  return (
    <div className="search-and-results">
      <div {...getComboboxProps()} className="search-container">
        <input
          {...getInputProps({
            onClick: () => {
              if (searchTerm !== "" && !isOpen) {
                openMenu();
              }
            },
          })}
          className="search-input"
          placeholder="Search"
        />
      </div>
      <ul
        {...getMenuProps()}
        className={clsx("search-results-menu", { "is-open": isOpen })}
      >
        {isOpen && renderMenuContents()}
      </ul>
    </div>
  );
}
Search.propTypes = {
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.theme)))
      .isRequired,
    tech: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.tech)))
      .isRequired,
    blockchain: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(FILTERS.blockchain))
    ).isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedEntryFromSearch: PropTypes.func.isRequired,
};
