import PropTypes from "prop-types";
import { sentenceCase } from "../../js/utilities";
import FILTERS from "../../constants/filters";
import { EntryPropType } from "../../js/entry";

export default function FilterSelector({ filter, entry, setEntry }) {
  const onChange = (value, checked) => {
    let filters = entry.filters[filter];
    if (checked) {
      filters.push(value);
    } else {
      filters = filters.filter((v) => v !== value);
    }
    setEntry({ ...entry, filters: { ...entry.filters, [filter]: filters } });
  };

  return (
    <div className="group">
      <fieldset>
        <legend>{sentenceCase(filter)}</legend>
        {Object.entries(FILTERS[filter]).map(([key, value]) => (
          <div key={key}>
            <input
              id={key}
              type="checkbox"
              checked={entry.filters[filter].includes(key)}
              onChange={({ target: { checked } }) => onChange(key, checked)}
            />{" "}
            <label htmlFor={key}>{value}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

FilterSelector.propTypes = {
  filter: PropTypes.oneOf(["theme", "tech", "blockchain"]).isRequired,
  entry: EntryPropType.isRequired,
  setEntry: PropTypes.func.isRequired,
};
