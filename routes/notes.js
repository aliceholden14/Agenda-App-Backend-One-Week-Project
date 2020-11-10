var express = require("express");
var router = express.Router();

const { addNote, getNotes, getNoteById } = require("../models/notes");

// Possible Routes
// /notes?priority=3
// /notes?category
// /notes?start=2012-01-01&end=2012-01-31

router.get("/", async function (req, res) {
  console.log(req.query);
  const { priority, category, start, end } = req.query;
  if (priority) {
    console.log("Whats the priority?");
    return;
  } else if (category) {
    console.log("Its a category!");
    return;
  } else if (start && end) {
    console.log("We have some dates");
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

module.exports = router;
