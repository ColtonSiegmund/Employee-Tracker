const { prompt } = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '11111111',
  database: 'employees_db',
});

appStart = () => {
  console.log("Welcome to Employee Manager");
  firstPrompt()
};

function firstPrompt(){
  prompt([
    {
      type: 'list',
      name: "choice",
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
    }
  ])
  .then (res => {
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
                    
    }
  })
};

function viewDepartments () {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
      firstPrompt();
    }) 
};

function viewRoles () {
  const sql = `SELECT * FROM role`;
    
  db.query(sql, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.table(row);
    firstPrompt();
  }) 
};

function viewEmployee () {
  const sql = `SELECT * FROM employee`;
    
  db.query(sql, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.table(row);
    firstPrompt();
  }) 
};

function addDepartment() {
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
      }
    ])
    .then (answer => {
      const params = [answer.name];
      const sql = `INSERT INTO department ( name ) VALUES (?)`;
      db.query(sql, params, (err, row) => {
        if (err) {
          console.log(err);
    }
    console.table("\nDepartment added to database!\n")
    appStart();
      });
    })
    };

    function addRole() {
      let departments = [];
      const sql = `SELECT name, id FROM department;`;
      db.query(sql, (err, row) => {
        departments = row.map(({name, id}) => {
          return { name: name, value: id};
        })
    
        prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role?'
          },
          {
            type: 'list',
            name: 'department',
            message: 'What department does the role belong to?',
            choices: departments
          }
        ])
        .then (answer => {
          const params = [answer.title, answer.salary, answer.department];
          const sql3 = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
          db.query(sql3, params, (err, row) => {
            if (err) {
              console.log(err);
        }
        console.table("\nRole added to database!\n")
        appStart();
          });
        })
        })
      };


function addEmployee() {
  let roles = [];
  let managers = [];
  const sql = `SELECT role.id, role.title FROM role;`;
  db.query(sql, (err, row) => {
    roles = row.map(({id, title}) => {
      return { name: title, value: id};
    })
    const sql2 = `SELECT * FROM employee WHERE manager_id IS NOT NULL;`;
    db.query(sql2, (err, row) => {
      managers = row.map(({manager_id, first_name}) => {
        return { name: first_name, value: manager_id };
      })
    managers.push("None");

    prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'What role does the employee belong to?',
        choices: roles
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Who is the employees manager?',
        choices: managers
      }
    ])
    .then (answer => {
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
      const sql3 = `INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)`;
      db.query(sql3, params, (err, row) => {
        if (err) {
          console.log(err);
    }
    console.table("\nEmployee added to database!\n")
    appStart();
      });
    })
    })
  });
}




appStart();