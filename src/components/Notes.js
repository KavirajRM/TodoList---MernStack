import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, editNote, deleteNote, getNotes } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    estate: "",
  });
  const navigate = useNavigate();

  const [searchvalue1, setSearchValue1] = useState("");
  const [searchvalue2, setSearchValue2] = useState("");
  const [checkstate, setCheckState] = useState("all");

  const deleteAllcompletednotes = async () => {
    const notes1 = notes.filter((note) => note.state === "completed");

    for (let i = 0; i < notes1.length; i++) {
      await deleteNote(notes1[i]._id);
    }
    getNotes();
  };

  const updateNote = (currentNote) => {
    ref.current.click();

    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      estate: currentNote.state,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.estate);
    props.showAlert("Todo Task Updated Successfully", "success");
    refClose.current.click();
  };
  const onChangeText = (e) => {
    setSearchValue1(e.target.value);
  };

  const onchangecheckbox = (e) => {
    setCheckState(e.target.id);
  };
  const refresh = () => {
    window.location.reload();
  };
  const onSearchClick = (e) => {
    setSearchValue2(searchvalue1);
    props.showAlert("Please Note: Search text is case sensitive", "warning");
  };
  const onChange = (e) => {
    if (e.target.name == "estate") {
      if (e.target.checked == true) {
        e.target.value = "completed";
        setNote({ ...note, [e.target.name]: e.target.value });
      } else {
        e.target.value = "active";
        setNote({ ...note, [e.target.name]: e.target.value });
      }
    } else {
      setNote({ ...note, [e.target.name]: e.target.value });
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="estate"
                    name="estate"
                    onChange={onChange}
                    value={note.estate}
                    checked={note.estate == "completed"}
                  />
                  <label className="form-check-label" htmlFor="state">
                    Completed
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Todo Item
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h4>Action Menu</h4>
        <div className="row action-box">
          <form className="d-flex col-md-10">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Title or description"
              aria-label="Search"
              onChange={onChangeText}
              name="search"
            />
            <button
              className="btn btn-outline-success mx-2"
              type="button"
              onClick={onSearchClick}
            >
              Search
            </button>
            <button
              className="btn btn-primary mx-2"
              type="button"
              onClick={refresh}
            >
              Refresh
            </button>
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="active"
                onChange={onchangecheckbox}
              />
              <label className="form-check-label" htmlFor="active">
                Active
              </label>
            </div>
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="completed"
                onChange={onchangecheckbox}
              />
              <label className="form-check-label" htmlFor="completed">
                Completed
              </label>
            </div>
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="all"
                onChange={onchangecheckbox}
              />
              <label className="form-check-label" htmlFor="all">
                All
              </label>
            </div>
            <div className="form-check">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/add-task");
                }}
              >
                Add Task
              </button>
            </div>
          </form>
          <div className="form-check col-md-2">
            <button
              className="btn btn-primary"
              onClick={deleteAllcompletednotes}
            >
              Delete all completed notes.
            </button>
          </div>
        </div>
        <div>
          <h4 className="tasks">Your Tasks</h4>
        </div>
        {notes.length === 0 && <h5>No Tasks to display </h5>}
        {notes.map((note, index) => {
          return (
            <NoteItem
              note={note}
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              index={index}
              searchvalue2={searchvalue2}
              checkstate={checkstate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
