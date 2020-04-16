const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "nathan",
    database: "company_db"
});

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.table("connected as id " + connection.threadId);
});

init();

function init() {
    inquirer
        .prompt([{
            type: "list",

            message: "What would you like to do?",

            choices: ["View All Employees",
                // "View All Employees By Department",
                // "View All Employees By Manager",
                "Add Employee",
                // "Remove Employee",
                "Update Employee Role",
                // "Update Employee Manager",
                "View All Roles",
                "Add Role",
                // "Remove Role",
                "View All Departments",
                "Add Department",
                // "Remove Department"
            ],

            name: "prompt"
        }])
        .then(answers => {
            console.log(answers)
            switch (answers.prompt) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                default:
                    console.log("no worky");
            };

        });
}


function viewAllEmployees() {
    connection.query("SELECT * FROM employee;", (err, data) => {
        if (err) {
            return res.status(500).end();
        }

        console.table(data);
        init();
    });
};


function viewAllDepartments() {
    connection.query("SELECT * FROM department;", (err, data) => {
        if (err) {
            return res.status(500).end();
        }

        console.table(data);
        init();
    });
}


function viewAllRoles() {
    connection.query("SELECT * FROM role;", (err, data) => {
        if (err) {
            return res.status(500).end();
        }

        console.table(data);
        init();
    });
}