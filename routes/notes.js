var express = require("express");
var router = express.Router();

const {
  addNote,
  getNotes,
  getNoteById,
  getNotesBetweenDates,
  getNotesByPriority,
  getNotesByCategory,
  getNotesOnAgenda,
  updateNoteById,
} = require("../models/notes");

router.get("/", async function (req, res) {
  console.log(req.query);
  const { priority, category, start, end, onAgenda } = req.query;
  if (priority) {
    const notes = await getNotesByPriority(priority);
    res.json({ success: true, data: notes });
    return;
  } else if (category) {
    const notes = await getNotesByCategory(category);
    res.json({ success: true, data: notes });
    return;
  } else if (start && end) {
    const notes = await getNotesBetweenDates(start, end);
    res.json({ success: true, data: notes });
    return;
  } else if (onAgenda) {
    const notes = await getNotesOnAgenda(onAgenda);
    res.json({ success: true, data: notes });
    return;
  }
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

router.put("/", async function (req, res) {
  console.log(req.body);
  const {
    id,
    userId,
    title,
    description,
    category,
    priority,
    onAgenda,
  } = req.body;
  const result = await updateNoteById(
    id,
    userId,
    title,
    description,
    category,
    priority,
    onAgenda
  );
  res.json({ success: true, message: `${id} has been updated` });
});

module.exports = router;
