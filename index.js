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
      console.log(answer);
      switch (answer.newRole) {
        case "Sales Lead": {
          addNewTitle(answer.newRole, answer.salary, 1);
          addNewEmployee(answer.firstName, answer.lastName, 1);
          break;
        }
        case "Salesperson": {
          addNewTitle(answer.newRole, answer.salary, 1);
          addNewEmployee(answer.firstName, answer.lastName, 2);
          break;
        }
        case "Lead Engineer": {
          addNewTitle(answer.newRole, answer.salary, 2);
          addNewEmployee(answer.firstName, answer.lastName, 3);
          break;
        }
        case "Software Engineer": {
          addNewTitle(answer.newRole, answer.salary, 2);
          addNewEmployee(answer.firstName, answer.lastName, 4);
          break;
        }
        case "Account Manager": {
          addNewTitle(answer.newRole, answer.salary, 3);
          addNewEmployee(answer.firstName, answer.lastName, 5);
          break;
        }
        case "Accountant": {
          addNewTitle(answer.newRole, answer.salary, 3);
          addNewEmployee(answer.firstName, answer.lastName, 6);
          break;
        }
      }
      start();
    });
};

const addNewEmployee = (firstName, lastName, roleId) => {
  connection.query(
    `INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) VALUES ( ? , ? , ? , ? )`,
    [firstName, lastName, roleId, null],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

const addNewTitle = (title, salary) => {
  connection.query(
    `INSERT INTO employee_db.role (title, salary) VALUES ( ? , ? )`,
    [title, salary],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

createRoleData = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new role?",
        name: "newRole",
      },
      {
        type: "input",
        message: "Enter salary?",
        name: "salary",
      },
    ])
    .then((answer) => {
      addNewTitle(answer.newRole, answer.salary);
      start();
    });
};

createDepartmentData = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department?",
        name: "newDepartment",
      },
    ])
    .then((answer) => {
      addNewTitle(answer.newDepartment);
      start();
    });
};
//keep this at the bottom of code
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  start();
});
