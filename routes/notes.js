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
router.patch("/:id", async function (req, res) {
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

// Deprecated code

// // Import functions from models
// const {
//   addNote,
//   getNotes,
//   getNoteById,
//   getNotesBetweenDates,
//   getNotesByPriority,
//   getNotesByCategory,
//   getNotesOnAgenda,
//   updateNoteById,
//   getNotesFromQuery,
// } = require("../models/notes");

// Handles a range of get requests based on various query options, compound queries not yet implemented
// router.get("/", async function (req, res) {
//   console.log(req.query);
//   const { priority, category, start, end, onAgenda } = req.query;
//   if (priority) {
//     const notes = await getNotesByPriority(priority);
//     res.json({ success: true, data: notes });
//     return;
//   } else if (category) {
//     const notes = await getNotesByCategory(category);
//     res.json({ success: true, data: notes });
//     return;
//   } else if (start && end) {
//     const notes = await getNotesBetweenDates(start, end);
//     res.json({ success: true, data: notes });
//     return;
//   } else if (onAgenda) {
//     const notes = await getNotesOnAgenda(onAgenda);
//     res.json({ success: true, data: notes });
//     return;
//   }
//   const notes = await getNotes();
//   res.json({ success: true, data: notes });
// });
