// Import query
const { query } = require("../index");

// Sample Data
const sampleData = [
  {
    userId: "student",
    title: "I don't get Arrays",
    description: "Whats the difference between arrays and objects",
    date: "2020-09-28",
    category: "javascript",
    priority: 2,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "How do function returns work",
    description: "I don't understand these",
    date: "2020-09-30",
    category: "javascript",
    priority: 2,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "DOM manipulation",
    description: "Struggling with query select all and CSS selectors",
    date: "2020-10-01",
    category: "javascript",
    priority: 1,
    on_agenda: true,
  },
  {
    userId: "student",
    title: "Job prospects",
    description:
      "I don't think I'm very good at this, are there any tech jobs that don't involve coding?",
    date: "2020-10-03",
    category: "industry",
    priority: 3,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "Roles in the tech industry",
    description:
      "What are the different jobs and roles that go into making a tech product?",
    date: "2020-10-06",
    category: "industry",
    priority: 2,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "What jobs involve node?",
    description:
      "Just getting my head around node, I really like it, what jobs involve working with node, is it a back end engineer?",
    date: "2020-10-07",
    category: "industry",
    priority: 3,
    on_agenda: true,
  },
  {
    userId: "student",
    title: "SQL WTF!!!",
    description: "SQL query why you no work? Sad face :(",
    date: "2020-10-08",
    category: "databases",
    priority: 3,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "Relational Databases",
    description:
      "Would like to discuss approaches to designing relational databases",
    date: "2020-10-12",
    category: "databases",
    priority: 1,
    on_agenda: true,
  },
  {
    userId: "student",
    title: "Help with React props",
    description: "Want to get a better understanding of this",
    date: "2020-10-20",
    category: "front-end",
    priority: 2,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "What is JQuery",
    description: "Is it still being used, does it work with React",
    date: "2020-10-30",
    category: "front-end",
    priority: 2,
    on_agenda: false,
  },
  {
    userId: "student",
    title: "Other front end frameworks",
    description: "What are the alternatives to React",
    date: "2020-10-26",
    category: "front-end",
    priority: 2,
    on_agenda: true,
  },
  {
    userId: "student",
    title: "Why do we need OOP?",
    description:
      "Why bother with OOP, it just seems to make things more complicated for no real benefit",
    date: "2020-10-29",
    category: "design patterns",
    priority: 2,
    on_agenda: true,
  },
  {
    userId: "student",
    title: "Help with MVC",
    description: "Want to explore some real world examples of MVC in action",
    date: "2020-11-02",
    category: "design patterns",
    priority: 1,
    on_agenda: true,
  },
];

// Insert a new row into notes
async function addNote(
  userId,
  title,
  description,
  date,
  category,
  priority = 0,
  onAgenda = false
) {
  const result = await query(
    `INSERT INTO 
        notes(user_id, title, description, date, category, priority, on_agenda) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) 
      RETURNING id;`,
    [userId, title, description, date, category, priority, onAgenda]
  );
  return result.rows[0].id;
}

// Execute
async function execute() {
  for (let i = 0; i < sampleData.length; i++) {
    const {
      userId,
      title,
      description,
      date,
      category,
      priority,
      on_agenda,
    } = sampleData[i];
    await addNote(
      userId,
      title,
      description,
      date,
      category,
      priority,
      on_agenda
    );
  }
}

execute();
