const { query } = require("../db/index");

async function getNotes() {
  const result = await query("SELECT * FROM notes");
  //console.log(result);
  return result;
}

async function getNoteById(id) {
  const result = await query("SELECT * FROM notes WHERE id = $1;", [id]);
  //console.log(result);
  return result;
}

async function getNotesBetweenDates(start, end) {
  const result = await query(
    "SELECT * FROM notes WHERE date BETWEEN $1 AND $2;",
    [start, end]
  );
  return result;
}

async function getNotesByPriority(priority) {
  const result = await query("SELECT * FROM notes WHERE priority = $1", [
    priority,
  ]);
  return result;
}

async function getNotesByCategory(category) {
  const result = await query("SELECT * FROM notes WHERE category = $1", [
    category,
  ]);
  return result;
}

async function getNotesOnAgenda(onAgenda) {
  const result = await query("SELECT * FROM notes WHERE on_agenda = $1", [
    onAgenda,
  ]);
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
  //console.log(result);
  return result.rows[0].id;
}

async function updateNoteById(
  id,
  userId,
  title,
  description,
  category,
  priority,
  onAgenda
) {
  const result = await query(
    "UPDATE notes SET user_id=$2, title=$3, description=$4, category=$5, priority=$6, on_agenda=$7 WHERE id=$1;",
    [id, userId, title, description, category, priority, onAgenda]
  );
  //console.log(result);
  //return result.rows[0].id;
}

module.exports = {
  addNote,
  getNotes,
  getNoteById,
  getNotesBetweenDates,
  getNotesByPriority,
  getNotesByCategory,
  getNotesOnAgenda,
  updateNoteById,
};
