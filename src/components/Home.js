import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

import Notes from "./Notes";

const Home = ({ showAlert }) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h3>List Tasks Screen</h3>

      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
