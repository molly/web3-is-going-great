import React, { useState } from "react";

import { signOut, upload } from "../../js/admin";

import { EMPTY_ENTRY, isValidEntry } from "../../js/entry";

import IconSelector from "./IconSelector";
import FilterSelector from "./FilterSelector";
import LinkField from "./LinkField.js";

export default function Form() {
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [attribution, setAttribution] = useState({ text: "", href: "" });

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const createFieldSetter = (field) => (val) => {
    const value = val?.target?.value === undefined ? val : val.target.value;
    setEntry({ ...entry, [field]: value });
  };
  const updateEntry = (toMerge) => {
    setEntry({ ...entry, ...toMerge });
  };
  const setLinks = createFieldSetter("links");
  const setImage = createFieldSetter("image");
  const setScamTotal = createFieldSetter("scamTotal");

  const addLink = () => {
    const newLink = { ...EMPTY_ENTRY.links[0] };
    const links = JSON.parse(JSON.stringify(entry.links));
    links.push(newLink);
    setLinks(links);
  };

  const clear = () => {
    setEntry(EMPTY_ENTRY);
    setAttribution({ text: "", href: "" });
  };

  const save = () => {
    setIsUploading(true);
    upload(entry, attribution)
      .then(() => {
        setIsUploadComplete(true);
        setIsUploading(false);
        setTimeout(() => setIsUploadComplete(false), 2000);
      })
      .catch((e) => {
        setIsUploading(false);
        console.error(e);
      });
  };

  return (
    <div className="entry-form">
      <div className="row">
        <div className="group">
          <label htmlFor="title">Title: </label>
          <textarea
            rows={2}
            id="title"
            onChange={createFieldSetter("title")}
            value={entry.title}
          />
        </div>
      </div>
      <div className="row">
        <div className="half">
          <label htmlFor="date">Date: </label>
          <input
            id="date"
            placeholder="YYYY-MM-DD"
            onChange={createFieldSetter("date")}
            value={entry.date}
          ></input>
        </div>
        <div className="half">
          <IconSelector
            updateEntry={updateEntry}
            value={entry.faicon || entry.icon}
          />
        </div>
      </div>
      <div className="row">
        <div className="half">
          <label htmlFor="scamTotal">Scam total: </label>
          <input
            id="scamTotal"
            onChange={({ target: { value } }) => {
              const intVal = value ? parseInt(value, 10) : 0;
              setScamTotal(intVal);
            }}
            value={entry.scamTotal}
            type="number"
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="group">
          <label htmlFor="body">Body: </label>
          <textarea
            rows={10}
            id="body"
            onChange={createFieldSetter("body")}
            value={entry.body}
          />
        </div>
      </div>
      <div className="row stretch">
        <FilterSelector filter="theme" entry={entry} setEntry={setEntry} />
        <FilterSelector filter="tech" entry={entry} setEntry={setEntry} />
        <FilterSelector filter="blockchain" entry={entry} setEntry={setEntry} />
      </div>
      <hr />
      {entry.links.map((link, ind) => (
        <LinkField
          index={ind}
          entry={entry}
          setLinks={setLinks}
          key={`link-${ind}`}
        />
      ))}
      <div className="row">
        <button onClick={addLink}>Add link</button>
      </div>
      <hr />
      <div className="row">
        <div className="group">
          <div>
            <b>Image:</b>
          </div>
          <label htmlFor="src">Src: </label>
          <input
            id="src"
            value={entry.image.src}
            onChange={({ target: { value } }) => {
              setImage({ ...entry.image, src: value });
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="group">
          <label htmlFor="alt">Alt text: </label>
          <textarea
            rows={3}
            id="alt"
            value={entry.image.alt}
            onChange={({ target: { value } }) => {
              setImage({ ...entry.image, alt: value });
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="group">
          <label htmlFor="caption">Caption: </label>
          <input
            id="caption"
            value={entry.image.caption}
            onChange={({ target: { value } }) => {
              setImage({ ...entry.image, caption: value });
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="half">
          <label htmlFor="attrText">Attribution text: </label>
          <input
            id="attrText"
            onChange={({ target: { value } }) =>
              setAttribution({ ...attribution, text: value })
            }
            value={attribution.text}
          ></input>
        </div>
        <div className="half">
          <label htmlFor="attrHref">Attribution href: </label>
          <input
            id="attrHref"
            onChange={({ target: { value } }) =>
              setAttribution({ ...attribution, href: value })
            }
            value={attribution.href}
          ></input>
        </div>
      </div>
      <button
        className="save-button"
        disabled={
          isUploading || isUploadComplete || !isValidEntry(entry, attribution)
        }
        onClick={save}
      >
        {isUploadComplete && <i className="fas fa-check" />}
        Save
      </button>
      <button onClick={clear}>Clear</button>
      <button className="signout-button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
