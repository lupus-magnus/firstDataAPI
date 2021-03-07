CREATE DATABASE `api01`;
USE api01;

CREATE TABLE pessoa (
	id int not null, -- para identificacao em nosso bd
    nome VARCHAR(50) NOT NULL, -- nome do cidadao retornado
    height VARCHAR(10),
    mass VARCHAR(10),
    gender VARCHAR(20),
    PRIMARY KEY(id)
);

SELECT * FROM pessoa
