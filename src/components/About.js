import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem1 } from "./NoteItem1";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const About = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, deleteNote, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    estate: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    console.log(notes);
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id == id) {
        setNote(notes[i]);
      }
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();

    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      estate: currentNote.state,
    });
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

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.estate);
    showAlert("Todo Task Updated Successfully", "success");
    refClose.current.click();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <NoteItem1
        note={note}
        key={note._id}
        updateNote={updateNote}
        showAlert={showAlert}
      />
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
                // disabled={
                //   note.etitle.length < 5 || note.edescription.length < 5
                // }
              >
                Update Todo Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
