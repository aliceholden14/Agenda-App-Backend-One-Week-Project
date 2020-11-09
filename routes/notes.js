var express = require("express");
var router = express.Router();

const { addNote } = require("../models/notes");

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
