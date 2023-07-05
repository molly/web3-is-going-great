import { useState, useEffect, useMemo } from "react";

import { signOut, upload } from "../../js/admin";
import { generateReadableId } from "../../js/utilities";

import { EMPTY_ENTRY, isValidEntry } from "../../js/entry";

import Entry from "../timeline/Entry";
import IconSelector from "./IconSelector";
import EntryTextArea from "./EntryTextArea";
import FilterSelector from "./FilterSelector";
import LinkField from "./LinkField.js";

export default function Form() {
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [imageAttribution, setImageAttribution] = useState({
    text: "",
    href: "",
  });
  const [entryAttribution, setEntryAttribution] = useState({
    text: "",
    href: "",
  });
  const generatedReadableId = useMemo(
    () => generateReadableId(entry.shortTitle || entry.title),
    [entry.shortTitle, entry.title]
  );
  const [showScamDetails, setShowScamDetails] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [entryId, setEntryId] = useState();

  const onWindowClose = (evt) => {
    if (entry !== EMPTY_ENTRY) {
      evt.preventDefault();
      evt.returnValue = "";
      return "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onWindowClose);
    return () => {
      window.removeEventListener("beforeunload", onWindowClose);
    };
  });

  const createFieldSetter = (field) => (val) => {
    let value;
    if (val && val.target && "value" in val.target) {
      value = val.target.value;
    } else {
      value = val;
    }
    setEntry({ ...entry, [field]: value });
  };
  const updateEntry = (toMerge) => {
    setEntry({ ...entry, ...toMerge });
  };
  const setLinks = createFieldSetter("links");
  const setImage = createFieldSetter("image");
  const setScamAmountDetails = createFieldSetter("scamAmountDetails");
  const setCollection = createFieldSetter("collection");
  const setStarred = createFieldSetter("starred");

  const toggleImageClass =
    (className) =>
    ({ target: { checked } }) => {
      if (checked) {
        entry.image.class = className;
      } else {
        delete entry.image.class;
      }
    };

  const addLink = () => {
    const newLink = { ...EMPTY_ENTRY.links[0] };
    const links = JSON.parse(JSON.stringify(entry.links));
    links.push(newLink);
    setLinks(links);
  };

  const clear = () => {
    setEntry(EMPTY_ENTRY);
    setImageAttribution({ text: "", href: "" });
    setEntryAttribution({ text: "", href: "" });
  };

  const save = () => {
    setIsUploading(true);

    // Set readableId and shortTitle if it hasn't been modified
    const entryWithDefaults = { ...entry };
    if (entryWithDefaults.readableId === "") {
      entryWithDefaults.readableId = generatedReadableId;
    }
    if (entryWithDefaults.shortTitle === "") {
      entryWithDefaults.shortTitle = entry.title;
    }

    upload(entryWithDefaults, imageAttribution, entryAttribution)
      .then((entryId) => {
        setIsUploadComplete(true);
        setEntryId(entryId);
        navigator.clipboard.writeText(entryId);
        setIsUploading(false);
        setTimeout(() => setIsUploadComplete(false), 2000);
      })
      .catch((e) => {
        setIsUploading(false);
        console.error(e);
      });
  };

  return (
    <div className="form-wrapper">
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
          <div className="group">
            <label htmlFor="shortTitle">Short title: </label>
            <textarea
              rows={1}
              id="shortTitle"
              onChange={createFieldSetter("shortTitle")}
              value={entry.shortTitle || entry.title.slice()}
            />
          </div>
        </div>
        <div className="row">
          <div className="group">
            <label htmlFor="readableId">Readable ID: </label>
            <textarea
              rows={1}
              id="readableId"
              onChange={createFieldSetter("readableId")}
              value={entry.readableId || generatedReadableId}
            />
          </div>
        </div>
        <div className="row">
          <div className="grow">
            <label htmlFor="date">Date: </label>
            <input
              id="date"
              placeholder="YYYY-MM-DD"
              onChange={createFieldSetter("date")}
              value={entry.date}
            ></input>
          </div>
          <div className="grow">
            <IconSelector
              updateEntry={updateEntry}
              value={entry.faicon || entry.icon}
            />
          </div>
          <div className="shrink row">
            <input
              id="starred"
              type="checkbox"
              checked={entry.starred || false}
              onChange={({ target: { checked } }) => setStarred(checked)}
            />
            <label htmlFor="starred">&nbsp;Starred</label>
          </div>
        </div>
        <div className="row">
          <div className="grow">
            <label htmlFor="scamTotal">Scam total: </label>
            <input
              id="scamTotal"
              onChange={({ target: { value } }) => {
                const intVal = value ? parseInt(value, 10) : 0;
                setScamAmountDetails({
                  ...entry.scamAmountDetails,
                  total: intVal,
                });
              }}
              value={entry.scamAmountDetails.total}
              type="number"
              min={0}
            ></input>
          </div>
          <div className="shrink">
            <button onClick={() => setShowScamDetails(true)}>
              Show details
            </button>
          </div>
        </div>
        {showScamDetails && (
          <>
            <div className="row">
              <div className="grow">
                <label htmlFor="lowerBound">Lower bound: </label>
                <input
                  id="lowerBound"
                  onChange={({ target: { value } }) => {
                    const intVal = value ? parseInt(value, 10) : undefined;
                    setScamAmountDetails({
                      ...entry.scamAmountDetails,
                      lowerBound: intVal,
                    });
                  }}
                  value={
                    entry.scamAmountDetails.lowerBound === undefined
                      ? ""
                      : entry.scamAmountDetails.lowerBound
                  }
                  type="number"
                  min={0}
                ></input>
              </div>
              <div className="grow">
                <label htmlFor="upperBound">Upper bound: </label>
                <input
                  id="upperBound"
                  onChange={({ target: { value } }) => {
                    const intVal = value ? parseInt(value, 10) : undefined;
                    setScamAmountDetails({
                      ...entry.scamAmountDetails,
                      upperBound: intVal,
                    });
                  }}
                  value={
                    entry.scamAmountDetails.upperBound === undefined
                      ? ""
                      : entry.scamAmountDetails.upperBound
                  }
                  type="number"
                  min={0}
                ></input>
              </div>
              <div className="grow">
                <label htmlFor="recovered">Recovered: </label>
                <input
                  id="recovered"
                  onChange={({ target: { value } }) => {
                    const intVal = value ? parseInt(value, 10) : undefined;
                    setScamAmountDetails({
                      ...entry.scamAmountDetails,
                      recovered: intVal,
                    });
                  }}
                  value={
                    entry.scamAmountDetails.recovered === undefined
                      ? ""
                      : entry.scamAmountDetails.recovered
                  }
                  type="number"
                  min={0}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="group">
                <label htmlFor="scamTextOverride">Text override: </label>
                <textarea
                  rows={1}
                  id="scamTextOverride"
                  onChange={({ target: { value } }) => {
                    setScamAmountDetails({
                      ...entry.scamAmountDetails,
                      textOverride: value,
                    });
                  }}
                  value={entry.scamAmountDetails.textOverride || ""}
                />
              </div>
            </div>
          </>
        )}
        <EntryTextArea entry={entry} onBodyChange={createFieldSetter("body")} />
        <div className="row stretch">
          <FilterSelector filter="theme" entry={entry} setEntry={setEntry} />
          <FilterSelector filter="tech" entry={entry} setEntry={setEntry} />
          <FilterSelector
            filter="blockchain"
            entry={entry}
            setEntry={setEntry}
          />
        </div>
        <div className="row">
          <div className="group">
            <label htmlFor="collection">Collection: </label>
            <input
              id="collection"
              onChange={({ target: { value } }) => {
                const splitCollection = value.split(/, */);
                setCollection(splitCollection);
              }}
              value={entry.collection.join(", ")}
            />
          </div>
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
          <div className="third">
            <div className="inline-checkbox">
              <input
                id="needs-dark"
                type="checkbox"
                checked={entry.image.class && entry.image.class == "on-dark"}
                onChange={toggleImageClass("on-dark")}
              />
              <label htmlFor="needs-dark">Needs dark bg</label>
            </div>
          </div>
          <div className="third">
            <div className="inline-checkbox">
              <input
                id="needs-light"
                type="checkbox"
                checked={entry.image.class && entry.image.class == "on-light"}
                onChange={toggleImageClass("on-light")}
              />
              <label htmlFor="needs-light">Needs light bg</label>
            </div>
          </div>
          <div className="third">
            <div className="inline-checkbox">
              <input
                id="is-logo"
                type="checkbox"
                checked={entry.image.isLogo}
                onChange={({ target: { checked } }) => {
                  setImage({ ...entry.image, isLogo: checked });
                }}
              />
              <label htmlFor="is-logo">Logo?</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="half">
            <label htmlFor="imageAttrText">Image attribution text: </label>
            <input
              id="imageAttrText"
              onChange={({ target: { value } }) =>
                setImageAttribution({ ...imageAttribution, text: value })
              }
              value={imageAttribution.text}
            ></input>
          </div>
          <div className="half">
            <label htmlFor="imageAttrHref">Image attribution href: </label>
            <input
              id="imageAttrHref"
              onChange={({ target: { value } }) =>
                setImageAttribution({ ...imageAttribution, href: value })
              }
              value={imageAttribution.href}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="group">
            <label htmlFor="caption">Source link: </label>
            <input
              id="source-link"
              value={entry.image.link || ""}
              onChange={({ target: { value } }) => {
                setImage({ ...entry.image, link: value });
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="half">
            <label htmlFor="entryAttrText">Entry attribution text: </label>
            <input
              id="entryAttrText"
              onChange={({ target: { value } }) =>
                setEntryAttribution({ ...entryAttribution, text: value })
              }
              value={entryAttribution.text}
            ></input>
          </div>
          <div className="half">
            <label htmlFor="entryAttrHref">Entry attribution href: </label>
            <input
              id="entryAttrHref"
              onChange={({ target: { value } }) =>
                setEntryAttribution({ ...entryAttribution, href: value })
              }
              value={entryAttribution.href}
            ></input>
          </div>
        </div>
        <div className="row">
          <button
            className="save-button"
            disabled={
              isUploading ||
              isUploadComplete ||
              !isValidEntry(entry, imageAttribution, entryAttribution)
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
        {entryId && <div className="row">EntryID: {entryId}</div>}
      </div>
      <div className="entry">
        <Entry entry={entry} allCollections={{}} />
      </div>
    </div>
  );
}
