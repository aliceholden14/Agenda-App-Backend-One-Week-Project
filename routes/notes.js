var express = require("express");
var router = express.Router();

const { addNote, getNotes, getNoteById } = require("../models/notes");

router.get("/", async function (req, res) {
  const notes = await getNotes();
  res.json({ success: true, data: notes });
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const note = await getNoteById(id);
  res.json({ success: true, data: note });
});

router.post("/", async function (req, res) {
  console.log(req.body);
  const { userId, title, description, category, priority, onAgenda } = req.body;
  const id = await addNote(
    userId,
    title,
    description,
    category,
    priority,
    onAgenda
  );
  res.json({ success: true, message: `${title} has been added with id ${id}` });
});

module.exports = router;
