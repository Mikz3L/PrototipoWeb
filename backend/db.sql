CREATE TABLE User (
    id_user INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    pass VARCHAR(50)
);


CREATE TABLE irrigation_calendar (
    id_calendar INT PRIMARY KEY,
    id_user INT,
    irrigation_day DATE,
    irrigation_hour TIME,
    FOREIGN KEY (id_user) REFERENCES User(id_user)
);


CREATE TABLE notification (
    id_notification INT PRIMARY KEY,
    id_user INT,
    id_calendar INT,
    shipping_date DATE,
    message TEXT,
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    FOREIGN KEY (id_calendar) REFERENCES irrigation_calendar(id_calendar)
);


CREATE TABLE Sensors (
    id_sensor INT PRIMARY KEY,
    type VARCHAR(50),
    location VARCHAR(100)
);

CREATE TABLE conditions_ambi (
    id_condition INT PRIMARY KEY,
    id_sensor INT,
    humidity DECIMAL(5, 2),
    temperature DECIMAL(5, 2),
    registration_date DATE,
    FOREIGN KEY (id_sensor) REFERENCES Sensors(id_sensor)
);