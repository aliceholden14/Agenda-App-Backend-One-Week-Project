const { query } = require("../db/index");

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
};
