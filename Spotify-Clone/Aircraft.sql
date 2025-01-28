CREATE DATABASE AircraftFm;
USE AircraftFm;
 CREATE TABLE Aircraft(
    AircraftID INT AUTO_INCREMENT PRIMARY KEY,
  Model VARCHAR(50) NOT NULL, Manufacturer VARCHAR(50), Capacity INT,
  Status ENUM('Active','Grounded','In Maintenance') DEFAULT 'Active' );


CREATE TABLE Flight(
    FlightID INT AUTO_INCREMENT PRIMARY KEY,
    AircraftID INT NOT NULL,
    Route VARCHAR(100),
    DepartureTime DATETIME,
    ArrivalTime DATETIME,
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(AircraftID));

    CREATE TABLE Crew(
        CrewID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Role ENUM('Pilot','Co-Pilot','FlightAttendant','GroundCrew') NOT NULL,
        Certification VARCHAR(100),
        ContactInfo VARCHAR(100)
    );
    desc crew;
    use aircraftfm;


    CREATE TABLE Passenger(
        PassengerID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        ContactInfo VARCHAR(100),
        BookingRefence VARCHAR(50)
    );

    CREATE TABLE Booking( 
        BookingID INT AUTO_INCREMENT PRIMARY KEY,
        PassengerID INT NOT NULL,
        FlightID INT NOT NULL,
        SeatNumber
        
        r VARCHAR(10),
        BookingStatus ENUM('Confirmed','Canceled') DEFAULT 'Confirmed',
        FOREIGN KEY(PassengerID) REFERENCES Passenger(PassengerID),
        FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
    );

CREATE TABLE Maintenance(
    MaintenanceID INT AUTO_INCREMENT PRIMARY KEY,
    AircraftID INT NOT NULL,
    Description TEXT,
    MaintenanceDate DATE,
    TechnicianName VARCHAR(100),
    Status ENUM('Scheduled','Compeleted','pending') DEFAULT 'Scheduled',
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(AircraftID)
);

CREATE TABLE FlightCrewAssignment(
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    FlightID INT NOT NULL,
    CrewID INT NOT NULL,
    Role ENUM('Pilot','Co-Pilot','FlightAttendant') NOT NULL,
    FOREIGN KEY(FlightID) REFERENCES Flight(FlightID),
    FOREIGN KEY (CrewID) REFERENCES Crew(CrewID)
);

CREATE TABLE GroundCrewAssignment(
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    AircraftID INT NOT NULL,
    CrewID INT NOT NULL,
    Task ENUM('Fueling','Loading','Cleaning','Inspection') NOT NULL,
    FOREIGN key (AircraftID) REFERENCES Aircraft(AircraftID),
    FOREIGN KEY (CrewID) REFERENCES Crew(CrewID)
);