const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Superdooper21!",
  database: "employee_db",
});

const menuQuestions = [
  "View all Employees",
  "View all Departments",
  "View all Roles",
  "Add Employee",
  "Add Role",
  "Add Department",
  "Update Employee role",
];

figlet("EMPLOYEE TRACKER", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

const start = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: menuQuestions,
      name: "whatAreWeDoing",
    })
    .then((answer) => {
      switch (answer.whatAreWeDoing) {
        case "View all Employees": {
          console.log("view all employees");
          viewData();
          break;
        }
        case "View all Departments": {
          viewDepartmentData();
          break;
        }
        case "View all Roles": {
          viewRoleData();
          break;
        }
        case "Add Employee": {
          updateEmployeeData();
          break;
        }
        case "Add Role": {
          createRoleData();
          break;
        }
        case "Add Department": {
          createDepartmentData();
          break;
        }
        case "Update Employee role": {
          updateRoleData();
          break;
        }
      }
    });
};

const viewData = () => {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewDepartmentData = () => {
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoleData = () => {
  console.log("Selecting all employee roles...\n");
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

updateEmployeeData = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is your employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is your employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "accountant",
        ],
        name: "newRole",
      },
      {
        type: "input",
        message: "What is your employee's salary?",
        name: "salary",
      },
    ])

    .then((answer) => {
      switch (answer.employeeTitle) {
        case "Sales Lead": {
          addNewTitle(title, salary, 1);
          addNewEmployee(firstName, lastName, 1);
          return mainMenuQuestion();
        }
        case "Salesperson": {
          addNewTitle(title, salary, 1);
          addNewEmployee(firstName, lastName, 2);
          return mainMenuQuestion();
        }
        case "Lead Engineer": {
          addNewTitle(title, salary, 2);
          addNewEmployee(firstName, lastName, 3);
          return mainMenuQuestion();
        }
        case "Software Engineer": {
          addNewTitle(title, salary, 2);
          addNewEmployee(firstName, lastName, 4);
          return mainMenuQuestion();
        }
        case "Account Manager": {
          addNewTitle(title, salary, 3);
          addNewEmployee(firstName, lastName, 5);
          return mainMenuQuestion();
        }
        case "Accountant": {
          addNewTitle(title, salary, 3);
          addNewEmployee(firstName, lastName, 6);
          return mainMenuQuestion();
        }
      }
      start();
    });
};

const addNewEmployee = (firstName, lastName, roleId) => {
  connection.query(
    `INSERT INTO employee_db.employee (firstName, lastName, newRole, NULL) VALUES ( ? , ? , ? , ? )`,
    [firstName, lastName, roleId, null],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

const addNewTitle = (title, salary, deptId) => {
  connection.query(
    `INSERT INTO employee_db.role (title, salary, NULL) VALUES ( ? , ? , ? )`,
    [title, salary, deptId],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

//keep this at the bottom of code
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  start();
});
