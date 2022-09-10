const inquirer = require('inquirer');
const questionPrompt = require('./server.js');
const db = require('./config/connection');

const showAllDepts = () => {
    db.query("SELECT * FROM department;", (err, rows) => {
            console.table(rows);
            //questionPrompt();
        });
};

const showAllRoles = () => {
    db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", (err, rows) => {
            console.table(rows);
            //questionPrompt();
        });
};

const showAllEmpl = () => {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (err, rows) => {
            console.table(rows);
            //questionPrompt();
        });
};

//getDeptsName();
//getRolesName();
//getEmplName();


//addDepartment();
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the department?'
        }
    ])
    .then(dept => {
        const newDeptName = dept.deptName;
        const query1 = `INSERT INTO department (name) VALUES ('${newDeptName}');`;

        //db.promise().query("INSERT INTO department (name) SET ?", name);
        db.query(query1, (err, rows) => {
            console.table(rows);
            showAllDepts();
        });
    })
};

//addRole();
const addRole = () => {

     return db.promise().query("SELECT department.id, department.name FROM department;")
        .then(([departments]) => {
            let deptsNameList = departments.map(({ id, name }) => ({
                name: name,
                value: id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },

            {
                type: 'input',
                name: 'rolesalary',
                message: 'What is the salary of the role?)',
            },

            {
                type: 'list',
                name: 'rolesDept',
                message: 'Which department does the role belongs to?',
                choices: deptsNameList
            }
        ])
            .then(newRole => {
                const { roleName, rolesalary, rolesDept } = newRole;
                console.log(rolesDept);
                const roleQuery = `INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', ${rolesalary}, '${rolesDept}');`;

                //db.promise().query("INSERT INTO department (name) SET ?", name);
                db.query(roleQuery, (err, rows) => {
                    console.table(rows);
                    showAllRoles();
                });
            });
        });
}

//addEmployee();

const addEmpl = () => {

    return db.promise().query("SELECT role.id, role.title FROM role;")
        .then(([roles]) => {
            let rolesList = roles.map(({ title, id}) => ({
                name: title,
                value: id
        }))

        db.promise().query("SELECT department.id, department.name FROM department;")
        .then(([managerName]) => {
            let managersList = managerName.map(({ manager, id }) => ({
                name: manager,
                value: id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'what is first name of the employee.',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'what is the last name of the employee.',
            },
            {
                type: 'list',
                name: 'roles',
                message: 'Select the role for employee',
                choices: rolesList,
            },
            {
                type: 'list',
                name: 'managerName',
                message: 'Select the manager for employee',
                choices: managersList
            }
        ])
        .then(newEmpl => {
            const { first_name, last_name, roles, managerName } = newEmpl;
            
            //const manager_first_name = managerName.split(' ')[0];
            //const manager_last_name = managerName.split(' ')[1];

            const emplQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${roles}', '${managerName}');`;

            //db.promise().query("INSERT INTO department (name) SET ?", name);
            db.query(emplQuery, (err, rows) => {
                console.table(rows);
                showAllEmpl();
            
                       
            });
        });

        });
    });
}


//updateEmployeeRole();

const updateEmplRole = () => {

    return db.promise().query("SELECT role.id, role.title, role.salary, role.department_id FROM role AS Role;")
        .then(([newRole]) => {
            let rolesList = newRole.map(({id, title}) => ({
                name: title,
                value: id
        }))

        db.promise().query("SELECT * FROM employee;")
        .then(([emplName]) => {
            let emplList = emplName.map(({ first_name, last_name, id }) => ({
                name: first_name, last_name,
                value: id
        }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'emplName',
                message: 'Select the employee you want to update the role.',
                choices: emplList
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'update the role for employee.',
                choices: rolesList
            },

            {
                type: 'input',
                name: 'salary',
                message: 'update salary for new role.',
            },
        ])
        .then(updateRole => {
            const { emplName, newRole, newManager, salary} = updateRole;
            
            //const manager_first_name = managerName.split(' ')[0];
            //const manager_last_name = managerName.split(' ')[1];

            const emplUpdateQuery = `UPDATE employee SET role_id = '${newRole}') WHERE first_name='${emplName}';`;
            

            //db.promise().query("INSERT INTO department (name) SET ?", name);
            db.query(emplUpdateQuery, (err, rows) => {
                console.table(rows);
                showAllEmpl();
            
                       
            });
        });

        });
    });
}

module.exports = {showAllDepts, showAllRoles, showAllEmpl, addDepartment, addRole, addEmpl, updateEmplRole};