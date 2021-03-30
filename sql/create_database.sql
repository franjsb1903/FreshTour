--- FIRST OF ALL, CREATE THE DATABASE
---     psql -c "CREATE DATABASE \"fresh_tour\";"
---     psql -d fresh_tour < create_database.sql

--- IT IS EASIER TO USE A PROGRAM AS DBEAVER IF IT IS POSIBLE
--- YOU CAN CREATE THE DATABASE AND THEN EXECUTE THE SCRIPT

--- SCHEMA CREATION
CREATE SCHEMA IF NOT EXISTS fresh_tour AUTHORIZATION postgres;

--- TABLE CREATION
CREATE TABLE IF NOT EXISTS fresh_tour.usuarios (
    id SERIAL PRIMARY KEY NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nome VARCHAR(50),
    apelidos VARCHAR(50),
    email VARCHAR(70) NOT NULL,
    contrasinal VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS fresh_tour.monumentos (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    cp INT,
    contexto VARCHAR,
    resumo VARCHAR,
    pais VARCHAR,
    municipio VARCHAR,
    direccion VARCHAR,
    url VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    imaxe BYTEA,
    tempo_visita_rapida FLOAT,
    tempo_visita_lenta FLOAT,
    tempo_visita_usuario FLOAT,
    valoracion FLOAT,
    comentario_visita_rapida VARCHAR,
    comentario_visita_lenta VARCHAR,
    CONSTRAINT pk_monumentos PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'monumentos',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_turisticos (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    cp INT,
    contexto VARCHAR,
    resumo VARCHAR,
    pais VARCHAR,
    municipio VARCHAR,
    direccion VARCHAR,
    url VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    imaxe BYTEA,
    tempo_visita_rapida FLOAT,
    tempo_visita_lenta FLOAT,
    tempo_visita_usuario FLOAT,
    valoracion FLOAT,
    comentario_visita_rapida VARCHAR,
    comentario_visita_lenta VARCHAR,
    CONSTRAINT pk_lugares_turisticos PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'lugares_turisticos',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    comentario VARCHAR NOT NULL,
    esta_compartida BOOLEAN NOT NULL,
    imaxe BYTEA,
    CONSTRAINT pk_planificacions PRIMARY KEY (id),
    CONSTRAINT fk_planificacions FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.monumentos_favoritos (
    id SERIAL NOT NULL,
    id_monumento INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_monumentos_fav PRIMARY KEY (id),
    CONSTRAINT fk_monumentos_fav FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_turisticos_favoritos (
    id SERIAL NOT NULL,
    id_lugar_turistico INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_lug_tur_fav PRIMARY KEY (id),
    CONSTRAINT fk_lug_tur_fav FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id),
    CONSTRAINT fk_usuarios_lug_tur_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_favoritas (
    id SERIAL NOT NULL,
    id_planificacion INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_planificacion_fav PRIMARY KEY (id),
    CONSTRAINT fk_planificacion_fav FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_usuarios_planificacion_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion INT NOT NULL,
    comentario VARCHAR NOT NULL,
    CONSTRAINT pk_com_val PRIMARY KEY (id),
    CONSTRAINT fk_usuario_com_val FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_monumentos (
    id_monumento INT NOT NULL,
    id_comentario_valoracion INT NOT NULL,
    CONSTRAINT pk_com_val_mon PRIMARY KEY (id_monumento, id_comentario_valoracion),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id),
    CONSTRAINT fk_comentario_valoracion FOREIGN KEY (id_comentario_valoracion) REFERENCES fresh_tour.comentarios_valoracions(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_lugares_turisticos (
    id_lugar_turistico INT NOT NULL,
    id_comentario_valoracion INT NOT NULL,
    CONSTRAINT pk_com_val_lug_tur PRIMARY KEY (id_lugar_turistico, id_comentario_valoracion),
    CONSTRAINT fk_lugar_turistico FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id),
    CONSTRAINT fk_comentario_valoracion FOREIGN KEY (id_comentario_valoracion) REFERENCES fresh_tour.comentarios_valoracions(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_planificacions (
    id_planificacion INT NOT NULL,
    id_comentario_valoracion INT NOT NULL,
    CONSTRAINT pk_com_val_plan PRIMARY KEY (id_planificacion, id_comentario_valoracion),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_comentario_valoracion FOREIGN KEY (id_comentario_valoracion) REFERENCES fresh_tour.comentarios_valoracions(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_lugares_turisticos (
    id_planificacion INT NOT NULL,
    id_lugar_turistico INT NOT NULL,
    posicion_visita INT NOT NULL,
    CONSTRAINT pk_plan_lug_tur PRIMARY KEY (id_planificacion, id_lugar_turistico),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_lugar_turistico FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_monumentos (
    id_planificacion INT NOT NULL,
    id_monumento INT NOT NULL,
    posicion_visita INT NOT NULL,
    CONSTRAINT pk_plan_mon PRIMARY KEY (id_planificacion, id_monumento),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_monumentos (
    id SERIAL NOT NULL,
    id_monumento INT NOT NULL,
    tempo FLOAT NOT NULL,
    CONSTRAINT pk_tempo_monumentos PRIMARY KEY (id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_lugares_turisticos (
    id SERIAL NOT NULL,
    id_lugar_turistico INT NOT NULL,
    tempo FLOAT NOT NULL,
    CONSTRAINT pk_tempo_lugares_turisticos PRIMARY KEY (id),
    CONSTRAINT fk_lugar_turistico FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id)
);

--- AUXILIAR TABLES

--- SCHEMA
CREATE SCHEMA fesh_tour_aux AUTHORIZATION postgres;

--- TABLE CREATION
CREATE TABLE fesh_tour_aux.lugares_turisticos_aux (
	"_id" varchar NULL,
	orden varchar NULL,
	localizacion_codigo_postal varchar NULL,
	titulo varchar NULL,
	seo_url varchar NULL,
	created varchar NULL,
	contenido varchar NULL,
	resumen varchar NULL,
	archivo varchar NULL,
	localizacion_pais varchar NULL,
	longitude varchar NULL,
	localizacion_identrada varchar NULL,
	fecha_finalizacion varchar NULL,
	id varchar NULL,
	localizacion_municipio varchar NULL,
	localizacion_direccion varchar NULL,
	localizacion_latitud_utm varchar NULL,
	fecha_publicacion varchar NULL,
	latitude varchar NULL,
	localizacion_longitud_utm varchar NULL,
	modified varchar NULL,
	extra_url varchar NULL
);
CREATE TABLE fesh_tour_aux.monumentos_aux (
	"_id" varchar NULL,
	orden varchar NULL,
	localizacion_codigo_postal varchar NULL,
	titulo varchar NULL,
	seo_url varchar NULL,
	created varchar NULL,
	contenido varchar NULL,
	resumen varchar NULL,
	archivo varchar NULL,
	localizacion_pais varchar NULL,
	longitude varchar NULL,
	localizacion_identrada varchar NULL,
	fecha_finalizacion varchar NULL,
	id varchar NULL,
	localizacion_municipio varchar NULL,
	localizacion_direccion varchar NULL,
	localizacion_latitud_utm varchar NULL,
	fecha_publicacion varchar NULL,
	latitude varchar NULL,
	localizacion_longitud_utm varchar NULL,
	modified varchar NULL,
	extra_url varchar NULL,
	localizacion_zoom varchar(32767) NULL
);