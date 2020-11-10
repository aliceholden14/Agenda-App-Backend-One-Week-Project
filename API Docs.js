// Available API requests
// Clone server from https://github.com/SchoolOfCode/back-end-project-week-the-promises.git
// Run using: npm run start


// GET Requests

// Get all notes
http://localhost:5000/notes

// Get by specific note ID (where id is a number)
http://localhost:5000/notes/id

// Get notes between dates (date format YYYY-MM-DD )
http://localhost:5000/notes?start=YYYY-MM-DD&end=YYYY-MM-DD

// Get notes by priority where value is a number
http://localhost:5000/notes?priority=value

// Get notes by category where value is a string
http://localhost:5000/notes?category=value

// Get notes by onAgenda where value is a boolean
http://localhost:5000/notes?onAgenda=boolean



// POST Requests

// Post a new note where post body is in the form { userId(string), title(string), description(string), category(string), priority(integer), onAgenda(boolean) }
// ID autogenerated and date will be auto set to current date
http://localhost:5000/notes



// PUT Requests

// Update an existing note by ID
// post body is in the form { id(integer), userId(string), title(string), description(string), category(string), priority(integer), onAgenda(boolean) }
http://localhost:5000/notes