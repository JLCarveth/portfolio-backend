CREATE TABLE IF NOT EXISTS users (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(75) NOT NULL UNIQUE,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(64) NOT NULL
);