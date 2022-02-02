import React, { useState } from "react";
import PropTypes from "prop-types";
import { Popover } from "react-tiny-popover";

export default function EnrichedBody({ children, glossary }) {
  const [activeTarget, setActiveTarget] = useState(null);

  const callback = (event) => {
    if (event.target.classList.contains("define-target")) {
      setActiveTarget(event.target);
    }
  };

  const safelyGetGlossaryField = (field) => {
    if (activeTarget && activeTarget.id) {
      if (glossary.entries[activeTarget.id]) {
        return glossary.entries[activeTarget.id][field];
      }
    }
    return "";
  };

  const renderPopoverContents = () => {
    const term = safelyGetGlossaryField("term");
    const definition = safelyGetGlossaryField("definition");
    if (!term || !definition) {
      return null;
    }
    return (
      <div>
        <div>
          <b>{term}</b>
        </div>
        <span dangerouslySetInnerHTML={{ __html: definition }} />
      </div>
    );
  };

  return (
    <Popover
      content={renderPopoverContents}
      isOpen={!!activeTarget}
      onClickOutside={() => setActiveTarget(null)}
      containerClassName="definition-popover"
    >
      <span
        id="bodyContainer"
        dangerouslySetInnerHTML={{ __html: children }}
        onClick={callback}
      />
    </Popover>
  );
}

EnrichedBody.propTypes = {
  children: PropTypes.string.isRequired,
  glossary: PropTypes.object.isRequired,
};
