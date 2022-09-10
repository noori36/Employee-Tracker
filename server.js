const express = require('express');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./config/connection').default;

const { showAllDepts, showAllRoles, showAllEmpl, addDepartment, addRole, addEmpl, updateEmplRole } = require('./queries.js');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
//const db = mysql.createConnection(
//    {
//    host: 'localhost',
// Your MySQL username,
//  user: process.env.DB_USER,
// Your MySQL password
//password: process.env.DB_PASSWORD,
// Your MySQL DB name
//database: process.env.DB_NAME
//},
//console.log('Connected to the employee_tracker database.')
//);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const questionPrompt = () => {
  return inquirer.prompt({
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",

    ]
  })

    .then(answer => {
      switch (answer.question) {
        case "view all departments":
          showAllDepts();
          break;
        case "add a department":
          addDepartment();
          break;
        case "view all roles":
          showAllRoles();
          break;
        case "add a role":
          addRole();
          break;
        case "view all employees":
          showAllEmpl();
          break;
        case "add an employee":
          addEmpl();
          break;
        case "update an employee role":
          updateEmplRole();
          break;
        default:
          process.exit();
      }
    })
};

//questionPrompt();

module.exports = questionPrompt();








