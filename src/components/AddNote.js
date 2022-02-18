import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    state: "active",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.state);
    setNote({ title: "", description: "", state: "active" });
    props.showAlert("Todo Task Added Successfully", "success");
    navigate("/");
  };
  const onChange = (e) => {
    if (e.target.name == "state") {
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
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="container my-3">
        <h4>Add Tasks</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="state"
              name="state"
              value={note.state}
              value="completed"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="state">
              Completed
            </label>
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
