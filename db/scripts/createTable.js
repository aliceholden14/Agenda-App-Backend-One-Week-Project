// import query
const { query } = require("../index");

// run query to make table
const sqlStatement = `
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    name TEXT,
    score INTEGER
)
`;

async function createTable() {
  const result = await query(sqlStatement);
  console.log(result);
}

createTable();
