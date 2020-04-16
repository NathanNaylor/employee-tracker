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

const departments = []
const roles = []

connection.query("SELECT * FROM department;", (err, data) => {
    if (err) {
        return res.status(500).end();
    }
    data.forEach(element => {
        departments.push(element.name)
    });
});

connection.query("SELECT * FROM role;", (err, data) => {
    if (err) {
        return res.status(500).end();
    }
    data.forEach(element => {
        roles.push(element.name)
    });
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
                    viewAll("employee");
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAll("role");
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAll("department");
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                default:
                    console.log("no worky");
            };

        });
}


function viewAll(tableName) {
    connection.query("SELECT * FROM ??;", tableName, (err, data) => {
        if (err) {
            return res.status(500).end();
        }

        console.table(data);
        init();
    });
};

function addRole() {
    inquirer
        .prompt([

            {
                message: "What is the name of the new Role?",

                name: "title"
            },
            {
                message: "What is the Salary of the new Role?",

                name: "salary"
            },
            {
                type: "list",

                message: "What Department?",

                choices: departments,

                name: "department"
            }
        ]).then(answers => {
            let department_id = JSON.parse(departments.indexOf(answers.department)) + 1
            console.log(department_id);
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.title, answers.salary, department_id],
                (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }

                    init();
                });
        })

};

function addDepartment() {
    inquirer
        .prompt([

            {
                message: "What is the name of the new Department?",

                name: "name"
            }
        ]).then(answers => {
            departments.push(answers.name)
            connection.query("INSERT INTO department (name) VALUES (?)",
                answers.name,
                (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }
                    init();
                });
        })

};

function addEmployee() {
    inquirer
        .prompt([

            {
                message: "What is the name of the new Role?",

                name: "first_name"
            },
            {
                message: "What is the Salary of the new Role?",

                name: "last_name"
            },
            {
                type: "list",

                message: "What Role?",

                choices: roles,

                name: "role"
            },
            {
                message: "What is their managers ID?",

                name: "managerId"
            }
        ]).then(answers => {
            let role_id = JSON.parse(roles.indexOf(answers.role)) + 1
            console.log(role_id);
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.title, answers.salary, role_id, answers.managerId],
                (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }

                    init();
                });
        })
};