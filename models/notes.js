const { query } = require("../db/index");

async function getNotes() {
  const result = await query("SELECT * FROM notes");
  console.log(result);
  return result;
}

async function getNoteById(id) {
  const result = await query("SELECT * FROM notes WHERE id = $1;", [id]);
  console.log(result);
  return result;
}

async function addNote(
  userId,
  title,
  description,
  category,
  priority = 0,
  onAgenda = false
) {
  const result = await query(
    "INSERT INTO notes(user_id, title, description, category, priority, on_agenda) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;",
    [userId, title, description, category, priority, onAgenda]
  );
  console.log(result);
  return result.rows[0].id;
}

module.exports = {
  addNote,
  getNotes,
  getNoteById,
};
