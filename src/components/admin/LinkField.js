import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

export default function LinkField({ index, entry, setLinks }) {
  const createLinkFieldSetter =
    (field) =>
    ({ target: { value } }) => {
      const links = JSON.parse(JSON.stringify(entry.links));
      links[index][field] = value;
      setLinks(links);
    };

  return (
    <>
      <div className="row">
        <div className="group">
          <div>
            <b>Link {index + 1}:</b>
          </div>
          <label htmlFor="href">Href: </label>
          <input
            id="href"
            value={entry.links[index].href}
            onChange={createLinkFieldSetter("href")}
          />
        </div>
      </div>
      <div className="row">
        <div className="group">
          <label htmlFor="linkText">Link text: </label>
          <textarea
            rows={2}
            id="linkText"
            value={entry.links[index].linkText}
            onChange={createLinkFieldSetter("linkText")}
          />
        </div>
      </div>
      <div className="row">
        <div className="group">
          <label htmlFor="extraText">Extra text: </label>
          <input
            id="extraText"
            value={entry.links[index].extraText}
            onChange={createLinkFieldSetter("extraText")}
          />
        </div>
      </div>
    </>
  );
}

LinkField.propTypes = {
  index: PropTypes.number.isRequired,
  entry: EntryPropType,
  setLinks: PropTypes.func.isRequired,
};
