const sql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  port: 3050,
  user: "root",
  password: "password",
  database: "employee_db",
});

const employeeQuestions =  [
    {
      type: 'list',
      message: "What would you like to do?",
      choices: ["View all employees", "View all employees by Department", "view all employees by Manager", "Add Employee", "Remove Employee", "Update Employee role", "Update Manager role"],
      name: "whatAreWeDoing",
  }
];

const employees = [
  //build a way to pull all employees off of sql table
  connection.query(SELECt * FROM $(employee, (err, res) => {
    if (err) throw err;
    console.tables(res)
  })
];

const employeebyDepartment = [
  //grab employees by their department ID
];

const employeeByManager = [
  //grab an emplayee by their status as manager
];

const addEmployee = [
    {
      type: 'input',
      message: "What is your employee's first name?",
      name: "firstName",
  },
    {
      type: 'input',
      message: "What is your employee's last name?",
      name: "lastName",
  },
    {
      type: 'list',
      message: "What is your employee's role?",
      choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "accountant"],
      name: "roleId",
  },
];

const removeEmployee = [
  //set up a selecter that will delete employees from the sql table
]

const updateEmployeeRole = [

  //set up a question that pulls employees names from mySQL

   {
       type: 'list',
       message: "What is their updated role?",
       choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "accountant"],
       name: "updatedRole"
   }
];

const updateManagerRole = [
  //pull employees that are managers and update role ID
  {

  }
];

connection connect((err) =.{
  if (err) throw err;
    console.log( connected as id${connection.threadID}\n);
});