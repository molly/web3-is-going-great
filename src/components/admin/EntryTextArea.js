import { useRef } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

export default function EntryTextArea({ entry, onBodyChange }) {
  const textAreaRef = useRef(null);
  const insertText = (text) => () => {
    const cursorPosition =
      textAreaRef.current.selectionStart || entry.body.length;
    const newText =
      entry.body.substring(0, cursorPosition) +
      text +
      entry.body.substring(cursorPosition, entry.body.length);
    onBodyChange(newText);
  };

  return (
    <>
      <div className="row">
        <div className="group">
          <label htmlFor="body">Body: </label>
          <textarea
            rows={10}
            id="body"
            onChange={onBodyChange}
            value={entry.body}
            ref={textAreaRef}
          />
        </div>
      </div>
      <div className="row">
        <button
          onClick={insertText('<button class="define-target" id=""></button>')}
        >
          Add definition
        </button>
        <button onClick={insertText('<a href="" target="_blank"></a>')}>
          Add link
        </button>
      </div>
    </>
  );
}

EntryTextArea.propTypes = {
  entry: EntryPropType.isRequired,
  onBodyChange: PropTypes.func.isRequired,
};
