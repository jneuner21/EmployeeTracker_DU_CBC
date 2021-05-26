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
salary DEC(10,4) NOT NULL
);

CREATE TABLE department(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) 
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Neuner", 1, 1),
("TJ", "Courey", 2, NULL),
("Nick", "Strong", 3, 1),
("Jon", "Gregory", 4, NULL),
("Peter", "Bishop", 5, 1),
("Ben", "Machock", 6, NULL),
("Sam", "Roberson", 2, NULL);

INSERT INTO role (title, salary)
VALUES ("Sales Lead", 160000),
("Salesperson", 60000),
("Lead Engineer", 240000),
("Software Engineer", 90000),
("Account Manager", 120000),
("Accountant", 60000);

INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Accounting");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;