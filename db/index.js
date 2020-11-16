// Bring in dependencies
require("dotenv").config();
const { Pool } = require("pg");

// Db pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Export query function for use in app
module.exports = {
  query: (sql, values, callback) => pool.query(sql, values, callback),
};
