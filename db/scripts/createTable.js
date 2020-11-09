// import query
const { query } = require("../index");

// run query to make table
const sqlStatement = `
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    category TEXT,
    priority INTEGER,
    on_agenda BOOLEAN
)
`;

async function createTable() {
  const result = await query(sqlStatement);
  console.log(result);
}

createTable();
