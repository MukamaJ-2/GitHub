show DATABASEs;
use cs;
show TABLEs;
desc employee;

ALTER TABLE employee

ADD CONSTRAINT fk_deptNo
Foreign Key (deptNo) REFERENCES department(deptNo)
ON DELETE CASCADE
ON UPDATE CASCADE;

--c--
show CREATE TABLE Employee;
show CREATE TABLE DEPARTMENT;

--d--
CREATE View view_d as 
SELECT * FROM Employee WHERE deptno=30;
desc view_d;

--e--
CREATE view view_e AS
SELECT job, COUNT(*) AS numemployes 
from employee
GROUP BY job;


--f--
create view view_f AS
SELECT * FROM employee
where Ename like 'T%';

--g--
CREATE view view_s AS
SELECT DISTINCT job 
FROM employee ORDER BY job DESC;

--h--
CREATE View view_h AS
SELECT job, SUM(salary) AS TotalSpent
FROM employee GROUP BY job;

use cs;
--i--
CREATE VIEW view_i AS
SELECT job, AVG(salary) as Avg_sal FROM
employee GROUP BY job HAVING AVG(salary)>25000;

--j--
CREATE view view_j AS
SELECT job, AVG(salary) as AV_SAL, SUM(salary) as TOT_SAL FROM 
Employee GROUP BY job;

--k--
ALTER Table department
ADD COLUMN location VARCHAR(50);
desc department;


ALTER Table department
MODIFY Dname VARCHAR(50);

USE CS;

 SHOW FULL TABLES WHERE TABLE_TYPE ='BASE TABLE';
 SHOW FULL TABLES WHERE TABLE_TYPE = 'VIEW';

 --N--
 CREATE VIEW VIEW_N AS
 SELECT EmpNo, Ename,
 CASE 
    WHEN deptno=10 THEN 'Computing Dept' 
    WHEN deptno=30 THEN 'Business Dept' 
    WHEN deptno=40 THEN 'marketing Dept' 
    ELSE 'n/a' 
 END as department
 FROM employee;

 CREATE View view_o AS
 SELECT Empno, Ename,
 CASE 
    WHEN deptno=10 THEN  salary*1.08
    WHEN deptno=30 THEN  salary*1.12
    WHEN deptno=40 THEN  salary*1.1
    ELSE salary 
 END as NewDapartment
 from employee;

 START TRANSACTION;

 UPDATE employee
 set salary =80000, job= 'Cleaner'
 where empno='e004';


 DELETE FROM employee
 where empno ='e002';

 SELECT * FROM view_o;

 ROLLBACK;

 desc employee;




CREATE VIEW as view_d 
    DEFAULT CHARACTER SET = 'utf8mb4';