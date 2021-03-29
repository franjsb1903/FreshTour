CREATE SCHEMA IF NOT EXISTS fresh_tour AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS fresh_tour.usuarios (
    id SERIAL PRIMARY KEY NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nome VARCHAR(50),
    apelidos VARCHAR(50),
    email VARCHAR(70) NOT NULL,
    contrasinal VARCHAR(50) NOT NULL
);

INSERT INTO fresh_tour.usuarios (usuario, email, contrasinal) VALUES ('Concello de Santiago de Compostela', 'informacion@santiagodecompostela.gal', 'santiago')