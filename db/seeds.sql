INSERT INTO department (name)
VALUES ("Marketing"),
       ("Human Resources"),
       ("Engineering"),
       ("QA"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 90000, 3),
       ("SQA Engineer", 65000, 4),
       ("Technical Recruiter", 55000, 2),
       ("Business Analyst", 85000, 5),
       ("Marketing Exective", 62000, 1),
       ("Data Scientist/Researcher", 70000, 1),
       ("HR Assistant", 63000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Bender", 1, NULL),
       ("Andy", "Vile", 3, 7),
       ("Josh", "Zell", 5, NULL),
       ("Justin", "Mark", 6, NULL),
       ("Jon", "Jones", 2, 1),
       ("Evan", "Wallis", 4, NULL),
       ("James", "Borg", 7, NULL);

       

