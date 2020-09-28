### Schema

CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE ingredients
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    price DECIMAL(10,2) not null,
	vegetarian BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
