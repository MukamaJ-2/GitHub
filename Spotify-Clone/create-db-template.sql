show databases;
use cs;
drop table project;

SELECT*FROM project;

CREATE TABLE Project (
projID INT PRIMARY KEY AUTO_INCREMENT,
ProjName VARCHAR(100) NOT NULL,
DeptNo INT,
EmpNo VARCHAR(10),
Foreign Key (DeptNo) REFERENCES Department(DeptNo));

 

INSERT into project (projName, DeptNo, EmpNo) VALUES
("Sales boost", '10','E003'),
("Marketing expansion", '40','E005'),
("Accounting Automation", '30','E007'),
("Sales Strategy", '10','E006');
    DEFAULT CHARACTER SET = 'utf8mb4';


--a) Retrieve Employes and their Department Details
SELECT E.EmpNo, E.Ename, E.job, E.Salary, D.DName, D.Loc
FROM Employee E
JOIN Department D ON E.DeptNo= D.DeptNo; 



--b) Retrieve Project and Their.Department Details
SELECT P.ProjID, P.ProjName, D.DName, D.Loc

FROM ProJect P

JOIN Department D ON P.DeptNo = D.DeptNo;

--c)
SELECT E.EmpNo, E.EName, E.job, E.salary, D.DName AS Department, P.ProjName AS Project
FROM Employee E JOIN Department D ON E.DeptNo = D.DeptNo JOIN Project P ON
D.DeptNo = P.DeptNo;


--d) Retrieve All Projects Along with the Department and Employees in That Department
SELECT P.ProjName AS Project, D.DName As Department, E.EName AS Employee, E.Job
FROM Project P JOIN Department D ON P.DeptNo = D.DeptNo JOIN Employee E ON D.DeptNo =
E.DeptNo
ORDER BY P.ProjName;

--e)
