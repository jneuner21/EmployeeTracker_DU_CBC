const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db",
});

const menuQuestions = [
  "View all employees",
  "View all employees by Department",
  "view all employees by Manager",
  "Add Employee",
  "Remove Employee",
  "Update Employee role",
  "Update Manager role",
];

const start = () => {
  console.log("it has started");
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: menuQuestions,
      name: "whatAreWeDoing",
    })
    .then((answer) => {
      console.log("entering switch");
      switch (answer.whatAreWeDoing) {
        case "View all employees": {
          console.log("view all employees");
          viewData();
          break;
        }
        case "view all employees by Department": {
          viewData();
          break;
        }
        case "view all employees by Manager": {
          viewData();
          break;
        }
        case "Add Employee": {
          updateData();
          break;
        }
        case "Remove Employee": {
          deleteData();
          break;
        }
        case "Update Employee role": {
          updateData();
          break;
        }
        case "Update Manager role": {
          updateData();
          break;
        }
      }
    });
};

const viewData = () => {
  console.log("Selecting all emploayees...\n");
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const deleteData = () => {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry",
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );

  start();
};

const updateData = () => {
  console.log("Updating employee information...\n");
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100,
      },
      {
        flavor: "Rocky Road",
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products updated!\n`);
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  start();
};

const employees = () => {
  //build a way to pull all employees off of sql table
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.tables(res);
  });
};

const employeebyDepartment = [
  //grab employees by their department ID
];

const employeeByManager = [
  //grab an emplayee by their status as manager
];

const addEmployee = [
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
    name: "roleId",
  },
];

addEmployee = () => {
  inquirer.prompt(addEmpQuestions).then((answer) => {
    connection.query("INSERT INTO employee SET ?", {
      first_name: answer.first_name,
      last_name: answer.last_name,
      title: answer.title,
      role_id: answer.role_id,
      manager_id: answer.manager_id,
    });
    connection.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      console.table("All employees", res);
    });
    start();
  });
};

const removeEmployee = [
  //set up a selecter that will delete employees from the sql table
];

const updateEmployeeRole = [
  {
    name: "last_name",
    type: "input",
    message: "What is the last name of the employee you want to update?",
  },
  {
    type: "list",
    message: "What is your employee's new role?",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "accountant",
    ],
    name: "roleId",
  },
];

const updateEmp = () => {
  inquirer.prompt(updateId).then((answer) => {
    connection.query("UPDATE employees SET role_id = ? WHERE last_name = ?", [
      answer.role_id,
      answer.last_name,
    ]);
    start();
    connection.query("SELECT * FROM employees", (err, res) => {
      if (err) throw err;
      console.table("Updated employees", res);
    });
  });
};

const updateManagerRole = [
  //pull employees that are managers and update role ID
  {},
];

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  start();
});
