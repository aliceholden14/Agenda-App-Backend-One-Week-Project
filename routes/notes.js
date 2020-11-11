var express = require("express");
var router = express.Router();

// Import functions from models
const {
  getNotes,
  getNoteById,
  getNotesFromQuery,
  addNote,
  updateNoteById,
  deleteNoteById,
} = require("../models/notes");

// Get all notes or a selection based on query parameters, null values are ignored by getNotesFromQuery()
router.get("/", async function (req, res) {
  const { start, end, priority, category, onAgenda } = req.query;
  // Check for any query
  if (start || end || priority || category || onAgenda) {
    const notes = await getNotesFromQuery(
      start,
      end,
      priority,
      category,
      onAgenda
    );
    res.json({ success: true, data: notes });
    return;
  }
  // Otherwise get all notes
  const notes = await getNotes();
  res.json({ success: true, data: notes });
});

// Get a specific note by id at the specified path
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const note = await getNoteById(id);
  res.json({ success: true, data: note });
});

// Post a new note with properties set from req.body
router.post("/", async function (req, res) {
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

// Update a specific note at the specified path, null values are ignored by updateNoteById()
// This should be 'patch' method rather than 'put' but that throws up a cors error that we couldn't fix
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const {
    userId,
    title,
    description,
    date,
    category,
    priority,
    onAgenda,
  } = req.body;
  const result = await updateNoteById(
    id,
    userId,
    title,
    description,
    date,
    category,
    priority,
    onAgenda
  );
  res.json({
    success: true,
    message: `Row with ID:${result} has been updated`,
  });
});

// Delete a specific note by id at the specified path
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const result = await deleteNoteById(id);
  res.json({ success: true, message: `Note with ID:${result} was deleted` });
});

// Export router for use in app.js
module.exports = router;
