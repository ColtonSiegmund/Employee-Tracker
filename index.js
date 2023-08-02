const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '11111111',
  database: 'employees_db',
});

appStart = () => {
  console.log("Welcome to Employee Manager");
  firstPrompt()
}

function firstPrompt(){
  inquirer
  .createPromptModule([
    {
      type: 'select',
      message:'Which would you like to do?',
      choices: [
        {
          name:"View All Departments",
          value: "VIEW_ALL_DEPARTMENT"
        },
        {
          name: "View All Roles",
          value: "VIEW_ALL_ROLES"
          },
          {
          name: "View All Employees",
          value: "VIEW_ALL_EMPLOYEE"
          },
          {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
          },
          {
            name: "Add a role",
            value: "ADD_ROLE"
          },
          {
            name: "Add an employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Update employee role",
            value: "UPDATE_EMPLOYEE"
          } 
        ]
    },
  ]).then (res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_ALL_DEPARTMENT":
        viewDepartments();
        break;
        case "VIEW_ALL_ROLES":
          viewRoles();
          break;
          case "VIEW_ALL_EMPLOYEE":
            viewEmployee();
            break;
            case "ADD_DEPARTMENT":
              addDepartment();
              break;
              case "ADD_ROLE":
                addRole();
                break;
                case "ADD_EMPLOYEE":
                  addEmployee();
                  break;
                  case "UPDATE_EMPLOYEE":
                    updateEmployee();
                    break;
    }
  })
}