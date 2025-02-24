CREATE TABLE empy (
    EID CHAR(4) NOT NULL PRIMARY KEY,
    AGE INT NOT NULL,
    GENDER CHAR(1),
    LNAME VARCHAR(50) NOT NULL,
    DNAME VARCHAR(50),
    SALARY DECIMAL(10, 2) NOT NULL,
    PHONENO VARCHAR(15),
    Email VARCHAR(100) UNIQUE,
    DOJ DATE NOT NULL);

    --ii--
    ALTER TABLE empy add constraint empy_eid CHECK (EID LIKE 'E%' AND LEN(EID) = 4);

--iii--
    ALTER TABLE empy add constraint empy_age check (age>18 and age<=60);


    --iv--
    ALTER TABLE empy ADD CONSTRAINT empy_lname   CHECK (LNAME = UPPER(LNAME));

    --v--
    ALTER TABLE empy add constraint empy_salary check (salary>40000 and salary<=100000);


    --vi--
    ALTER TABLE empy add constraint empy_phoneno unique(PHONENO);


    --vii--
    ALTER TABLE empy add constraint empy_email  CHECK (Email LIKE '%@%');

    --viii-
    ALTER TABLE empy add constraint empy_gender  check ( gender in ('M','F'));


    --ix--
     ALTER TABLE empy add constraint empy_eid CHECK (EID LIKE 'E%' AND LEN(EID) = 4);



    



,





    -- 1. Create table with all constraints
CREATE TABLE EMPY (
    EID VARCHAR(4) CHECK (EID LIKE 'E%' AND LEN(EID) = 4),
    AGE INT CHECK (AGE BETWEEN 18 AND 60),
    GENDER VARCHAR(10) NOT NULL,
    LNAME VARCHAR(50) CHECK (LNAME = UPPER(LNAME)),
    DNAME VARCHAR(50),
    SALARY DECIMAL(10,2) CHECK (SALARY BETWEEN 40000 AND 100000),
    PHONENO VARCHAR(15) UNIQUE,
    Email VARCHAR(100) CHECK (Email LIKE '%@%'),
    DOJ DATE,
    CONSTRAINT PK_EMPY PRIMARY KEY (EID)
);

-- 2. Test constraints with valid and invalid data
-- Valid data
INSERT INTO EMPY VALUES('E123', 25, 'M', 'SMITH', 'IT', 50000, '1234567890', 'smith@company.com', '2024-02-24');

-- Test invalid data (will fail)
-- Wrong EID format
INSERT INTO EMPY VALUES('A123', 25, 'M', 'SMITH', 'IT', 50000, '1234567891', 'smith2@company.com', '2024-02-24');

-- Invalid age
INSERT INTO EMPY VALUES('E124', 15, 'M', 'JONES', 'HR', 60000, '1234567892', 'jones@company.com', '2024-02-24');

-- Invalid salary
INSERT INTO EMPY VALUES('E125', 30, 'F', 'WILSON', 'SALES', 120000, '1234567893', 'wilson@company.com', '2024-02-24');

-- 3. Eliminate salary range constraint
ALTER TABLE EMPY
DROP CONSTRAINT CHK_EMPY_SALARY;

-- 4. Drop phone distinct constraint
ALTER TABLE EMPY
DROP CONSTRAINT UQ_EMPY_PHONE;

-- 5. Insert sample data outside salary range
INSERT INTO EMPY VALUES('E126', 35, 'F', 'BROWN', 'FINANCE', 150000, '1234567894', 'brown@company.com', '2024-02-24');
INSERT INTO EMPY VALUES('E127', 40, 'M', 'GREEN', 'SALES', 35000, '1234567895', 'green@company.com', '2024-02-24');

-- Verify data
SELECT * FROM EMPY WHERE SALARY NOT BETWEEN 40000 AND 100000;