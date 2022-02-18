import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

export const NoteItem = ({
  note,
  updateNote,
  showAlert,
  index,
  searchvalue2,
  checkstate,
}) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const [note1, setNote] = useState(note);
  const navigate = useNavigate();
  const details = (id) => {
    navigate(`/about/${id}`);
  };
  const handleClick = (e) => {
    // console.log(searchvalue2);
    editNote(note1._id, note1.title, note1.description, note1.state);
    showAlert("State Updated Successfully", "success");
  };
  const onChange = (e) => {
    if (e.target.name == "state") {
      if (e.target.checked == true) {
        e.target.value = "completed";
        setNote({ ...note1, [e.target.name]: e.target.value });
      } else {
        e.target.value = "active";
        setNote({ ...note1, [e.target.name]: e.target.value });
      }
    }
    showAlert(
      "Please click on the toggle state button to update state on the backend.",
      "danger"
    );
  };
  return (
    <>
      {(note.title.includes(searchvalue2) ||
        note.description.includes(searchvalue2)) &&
      (note.state == checkstate || checkstate == "all") ? (
        <div className="col-md-3">
          <div className="card my-3">
            <div className="card-body">
              <div className="tile-header">
                <h4>Tile no: {index + 1}</h4>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <h5 className="card-title" onClick={() => details(note._id)}>
                  Title: {note.title}
                </h5>
                {/* <div>
          <i
            className="fa fa-trash-o mx-1"
            style={{ fontSize: "25px" }}
            onClick={() => {
              deleteNote(note._id);
              showAlert("Todo Task deleted Successfully", "danger");
            }}
          ></i>
          <i
            className="fa fa-edit mx-1"
            style={{ fontSize: "25px" }}
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div> */}
              </div>

              <p className="card-text">
                <strong>Description:</strong> {note.description}
              </p>
              <p className="card-text">State: {note1.state}</p>

              <br />
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="state"
                  name="state"
                  value={note1.state}
                  value="completed"
                  onChange={onChange}
                  checked={note1.state == "completed"}
                />
                <label className="form-check-label" htmlFor="state">
                  Completed
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Toggle State
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
