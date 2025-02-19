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
("Accounting Automation", '30','E007'),
("Sales Strategy", '10','E006');
    DEFAULT CHARACTER SET = 'utf8mb4';


--a) Retrieve Employes and their Department Details
SELECT E.EmpNo, E.Ename, E.job, E.Salary, D.DName, D.Loc
FROM Employee E
JOIN Department D ON E.DeptNo= D.DeptNo; 



--b) Retrieve Project and Their.Department Details
SELECT P.ProjID, P.ProjName, D.DName, D.Loc
