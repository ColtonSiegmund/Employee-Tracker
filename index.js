const inquirer = require('inquirer');
const fs = require('fs');

function init(){
  inquirer
  .createPromptModule([
    {
      type: 'checkbox',
      message:'Which would you like to add?',
      name: 'choices',
      choices: ["department", "role", "employee"]
    },
  ])
  if (choices === "department"){
      inquirer
      .createPromptModule([
        {
          type: 'input',
          message: 'What is your department name?',
          name: 'department'
        }
      ])
  } else if (choices === "role"){
    inquirer
    .createPromptModule([
      {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'roleName'
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'roleSalary'
      }
    ])
  } else {
    inquirer
    .createPromptModule([
      {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'employeeFirstName'
      },
      {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'employeeLastName'
      },
      {
        type: 'input',
        message: 'What is the employees role?',
        name: 'employeeRole'
      },
      {
        type: 'input',
        message: 'Who is the employees manager?',
        name: 'employeeManager'
      }
    ])
  }
}