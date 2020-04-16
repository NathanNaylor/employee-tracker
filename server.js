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


inquirer
    .prompt(

    )
    .then()




connection.query("SELECT * FROM department;", (err, data) => {
    if (err) {
        return res.status(500).end();
    }

    console.table(data)
});
connection.query("SELECT * FROM role;", (err, data) => {
    if (err) {
        return res.status(500).end();
    }

    console.table(data)
});
connection.query("SELECT * FROM employee;", (err, data) => {
    if (err) {
        return res.status(500).end();
    }

    console.table(data)
});