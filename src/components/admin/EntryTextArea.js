import { useRef } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

export default function EntryTextArea({ entry, onBodyChange }) {
  const textAreaRef = useRef(null);
  const insertTag = (startTag, endTag) => () => {
    let cursorPosition = textAreaRef.current.selectionStart;
    let selectionEnd = textAreaRef.current.selectionEnd;

    if (cursorPosition === 0 && selectionEnd === 0) {
      // If both positions are 0, cursor is either not in the textarea or it's in the beginning position
      // In that case, insert the tag at the very end, since that's most likely the intention
      cursorPosition = entry.body.length;
      selectionEnd = entry.body.length;
    }

    const highlightedText = entry.body.substring(cursorPosition, selectionEnd);
    const newText =
      entry.body.substring(0, cursorPosition) +
      startTag +
      highlightedText +
      endTag +
      entry.body.substring(selectionEnd, entry.body.length);
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
          onClick={insertTag(
            '<button class="define-target" id="">',
            "</button>"
          )}
        >
          Add <span className="define-target">definition</span>
        </button>
        <button onClick={insertTag('<a href="" target="_blank">', "</a>")}>
          Add <a style={{ textDecoration: "underline" }}>link</a>
        </button>
      </div>
    </>
  );
}

EntryTextArea.propTypes = {
  entry: EntryPropType.isRequired,
  onBodyChange: PropTypes.func.isRequired,
};
