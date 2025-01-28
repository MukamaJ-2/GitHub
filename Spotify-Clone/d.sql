CREATE DATABASE school;
use school;
CREATE TABLE programme(pid varchar(20) PRIMARY KEY, pname VARCHAR (20));
INSERT INTO programme VALUES('p001','CS'),('p002','IT'),('p003','DS');
SELECT * FROM programme;

CREATE TABLE student(s_id VARCHAR (20) PRIMARY key, sname VARCHAR(20), gender CHAR(1),pid VARCHAR(20), FOREIGN KEY(pid) REFERENCES programme(pid));
SELECT * FROM student;
INSERT INTO student VALUES('s001','simon','M','P003'),('s002','Mary','F','P001'),('s003','John','M','P002');
ALTER TABLE student add COLUMN DOB date;
ALTER TABLE student rename column s_id to student_id; 
desc student;
SELECT * from student WHERE gender = 'M';
   DEFAULT CHARACTER SET = 'utf8mb4';
   use school;
INSERT INTO student (DOB) VALUES ('2000-23-02'),('1990-12-6'),('2004-12-04');