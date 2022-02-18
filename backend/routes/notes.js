const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");

//Get All notes/tasks
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

//Add Note/Login required
router.post(
  "/addnote",
  [
    body(
      "description",
      "Minimum length of description should be 5 characters"
    ).isLength({
      min: 5,
    }),
    body(
      "title",
      "Minimum length of description should be 3 characters"
    ).isLength({
      min: 3,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, state } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, state, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Update an existing note
router.put(
  "/update/:id",
  [
    body(
      "description",
      "Minimum length of description should be 5 characters"
    ).isLength({
      min: 5,
    }),
    body(
      "title",
      "Minimum length of description should be 3 characters"
    ).isLength({
      min: 3,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, state } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (state) {
        newNote.state = state;
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Task not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Delete an existing note
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Task not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});
module.exports = router;
