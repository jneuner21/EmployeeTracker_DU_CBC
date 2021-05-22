DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DEC(10,4) NOT NULL,
department_id INT NOT NULL
);

CREATE TABLE department(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) 
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Neuner", 1, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Coder", 60000, 1);

INSERT INTO department (name)
VALUES ("Front-end Web Team");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;