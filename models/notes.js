// Import query function preloaded with env variables
const { query } = require("../db/index");

// Get all notes
async function getNotes() {
  const result = await query("SELECT * FROM notes");
  return result;
}

// Get a specific note by ID
async function getNoteById(id) {
  const result = await query("SELECT * FROM notes WHERE id = $1;", [id]);
  return result;
}

// Get notes that match a given query, null parameters are ignored
async function getNotesFromQuery(start, end, priority, category, onAgenda) {
  const result = await query(
    `SELECT * FROM notes 
      WHERE (date >= COALESCE($1, date)) 
      AND (date <= COALESCE($2, date))
      AND (priority = COALESCE($3, priority))
      AND (category = COALESCE($4, category))
      AND (on_agenda = COALESCE($5, on_agenda));`,
    [start, end, priority, category, onAgenda]
  );
  return result;
}

// Insert a new row into notes, ID is auto generated and date is taken from the date of entry
async function addNote(
  userId,
  title,
  description,
  category,
  priority = 0,
  onAgenda = false
) {
  const result = await query(
    `INSERT INTO 
      notes(user_id, title, description, category, priority, on_agenda) 
      VALUES ($1,$2,$3,$4,$5,$6) 
    RETURNING id;`,
    [userId, title, description, category, priority, onAgenda]
  );
  return result.rows[0].id;
}

// Update a note by DB ID reference, null values are ignored and not updated or replaced
async function updateNoteById(
  id,
  userId,
  title,
  description,
  date,
  category,
  priority,
  onAgenda
) {
  const result = await query(
    `UPDATE notes SET 
      user_id = COALESCE($2, user_id), 
      title = COALESCE($3, title), 
      description = COALESCE($4, description),
      date = COALESCE($5, date),
      category = COALESCE($6, category),
      priority = COALESCE($7, priority),
      on_agenda = COALESCE($8, on_agenda) 
    WHERE id = $1
    RETURNING id;`,
    [id, userId, title, description, date, category, priority, onAgenda]
  );
  return result.rows[0].id;
}

// Delete a specific note by ID
async function deleteNoteById(id) {
  const result = await query("DELETE FROM notes WHERE id = $1 RETURNING id;", [
    id,
  ]);
  return result.rows[0].id;
}

// Export functions for use in routes
module.exports = {
  getNotes,
  getNoteById,
  getNotesFromQuery,
  addNote,
  updateNoteById,
  deleteNoteById,
};
