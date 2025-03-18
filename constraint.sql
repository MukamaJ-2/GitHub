CREATE DATABASE  sc;

use sc;
desc ta

use cs;

create table empx(EID VARCHAR(20), CONSTRAINT empx_pk PRIMARY KEY(EID), 
designation VARCHAR(20) constraint emp_des check (designation in ('manager','cleark','teacher')), 
age INT constraint empx_age check(age>18),
DOJ DATETIME DEFAULT CURRENT_TIMESTAMP,
gender VARCHAR(10),
email VARCHAR(20),
telno INT);


ALTER TABLE empx add constraint empx_gender check (gender in('M','F'));


ALTER TABLE empx DROP constraint empx_gender;


ALTER TABLE empx add constraint emp_gender check(gender='M' OR gender='F');

ALTER TABLE empx add constraint empx_email unique(email);



ALTER TABLE empx add constraint empx_telno check(length(telno)=10);


INSERT INTO empx (EID, designation, age , gender, email, telno) VALUES
('E001','MANAGER','34', 'm','one@gmail.com','1234567898');

INSERT INTO empx (EID, designation, age , gender, email, telno) VALUES
('E002','cleark','44','m','two@gmail.com','1934567898');


SELECT CONSTRAINT_NAME, CONSTRAINT_type, TABLE_NAME FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_NAME='empx';
    DEFAULT CHARACTER SET = 'utf8mb4';

    CREATE TABLE project(
        ProjectID INT PRIMARY KEY AUTO_INCREMENT,
        ProjectName VARCHAR(100) NOT NULL,
        Empolyee
    )

    -- on delete set null 