--- FIRST OF ALL, CREATE THE DATABASE
---     psql -c "CREATE DATABASE \"fresh_tour\" OWNER postgres;"
---     psql -d fresh_tour < create_database.sql
--- IT IS EASIER TO USE A PROGRAM AS DBEAVER IF IT IS POSIBLE
--- YOU CAN CREATE THE DATABASE AND THEN EXECUTE THE SCRIPT
--- OR IF YOU PREFERE, YOU CAN USE THE BELOW SCRIPT LINE

--- CREATE DATABASE fresh_tour OWNER postgres;

--- ENABLE POSTGIS
CREATE EXTENSION postgis;
--- SCHEMA CREATION
CREATE SCHEMA IF NOT EXISTS fresh_tour AUTHORIZATION postgres;
--- TABLE CREATION
CREATE TABLE IF NOT EXISTS fresh_tour.usuarios (
    id SERIAL NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nome VARCHAR(50),
    apelidos VARCHAR(50),
    email VARCHAR(70) NOT NULL,
    contrasinal VARCHAR NOT NULL,
    data TIMESTAMP NOT NULL,
    CONSTRAINT pk_usuarios PRIMARY KEY (id)
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
    imaxe VARCHAR,
    tempo_visita_rapida FLOAT,
    tempo_visita_lenta FLOAT,
    tempo_visita_usuario FLOAT,
    valoracion FLOAT,
    comentario_visita_rapida VARCHAR,
    comentario_visita_lenta VARCHAR,
    horario VARCHAR,
    prezo FLOAT,
    prezo_reducido FLOAT,
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
    imaxe VARCHAR,
    tempo_visita_rapida FLOAT,
    tempo_visita_lenta FLOAT,
    tempo_visita_usuario FLOAT,
    valoracion FLOAT,
    comentario_visita_rapida VARCHAR,
    comentario_visita_lenta VARCHAR,
    horario VARCHAR,
    prezo FLOAT,
    prezo_reducido FLOAT,
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
    valoracion FLOAT,
    distancia FLOAT NOT NULL,
    tempo_visita FLOAT NOT NULL,
    tempo_ruta FLOAT NOT NULL,
    CONSTRAINT pk_planificacions PRIMARY KEY (id),
    CONSTRAINT fk_planificacions FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.monumentos_favoritos (
    id_monumento INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_monumentos_fav PRIMARY KEY (id_monumento, id_usuario),
    CONSTRAINT fk_monumentos_fav FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_turisticos_favoritos (
    id_lugar_turistico INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_lug_tur_fav PRIMARY KEY (id_lugar_turistico, id_usuario),
    CONSTRAINT fk_lug_tur_fav FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id),
    CONSTRAINT fk_usuarios_lug_tur_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_favoritas (
    id_planificacion INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_planificacion_fav PRIMARY KEY (id_planificacion, id_usuario),
    CONSTRAINT fk_planificacion_fav FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_usuarios_planificacion_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_monumentos (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR(250) NOT NULL,
    id_monumento INT NOT NULL,
    CONSTRAINT pk_com_val_mon PRIMARY KEY (id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id),
    CONSTRAINT fk_comentario_valoracion_monumentos FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_lugares_turisticos (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR(250) NOT NULL,
    id_lugar_turistico INT NOT NULL,
    CONSTRAINT pk_com_val_lug PRIMARY KEY (id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id),
    CONSTRAINT fk_comentario_valoracion_lugares FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_planificacions (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR(250) NOT NULL,
    id_planificacion INT NOT NULL,
    CONSTRAINT pk_com_val_plan PRIMARY KEY (id),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_comentario_valoracion_planificacions FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_lugares_turisticos (
    id_planificacion INT NOT NULL,
    id_lugar_turistico INT NOT NULL,
    posicion_visita INT NOT NULL,
    tipo_visita FLOAT,
    CONSTRAINT pk_plan_lug_tur PRIMARY KEY (id_planificacion, id_lugar_turistico),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_lugar_turistico FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_monumentos (
    id_planificacion INT NOT NULL,
    id_monumento INT NOT NULL,
    posicion_visita INT NOT NULL,
    tipo_visita FLOAT,
    CONSTRAINT pk_plan_mon PRIMARY KEY (id_planificacion, id_monumento),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_monumentos (
    id SERIAL NOT NULL,
    id_monumento INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP,
    CONSTRAINT pk_tempo_monumentos PRIMARY KEY (id),
    CONSTRAINT fk_monumento FOREIGN KEY (id_monumento) REFERENCES fresh_tour.monumentos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_lugares_turisticos (
    id SERIAL NOT NULL,
    id_lugar_turistico INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP,
    CONSTRAINT pk_tempo_lugares_turisticos PRIMARY KEY (id),
    CONSTRAINT fk_lugar_turistico FOREIGN KEY (id_lugar_turistico) REFERENCES fresh_tour.lugares_turisticos(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_hostalaria (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    main_tag VARCHAR,
    sub_tag VARCHAR,
    CONSTRAINT pk_lugares_hostalaria PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'lugares_hostalaria',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_hospedaxe (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    main_tag VARCHAR,
    sub_tag VARCHAR,
    CONSTRAINT pk_lugares_hospedaxe PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'lugares_hospedaxe',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.actividades_ocio (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    main_tag VARCHAR,
    sub_tag VARCHAR,
    CONSTRAINT pk_actividades_ocio PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'actividades_ocio',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.outras_actividades (
    id SERIAL NOT NULL,
    titulo VARCHAR,
    data_adicion TIMESTAMP,
    data_modificacion TIMESTAMP,
    main_tag VARCHAR,
    sub_tag VARCHAR,
    CONSTRAINT pk_outras_actividades PRIMARY KEY (id)
);
SELECT AddGeometryColumn (
        'fresh_tour',
        'outras_actividades',
        'geom',
        4326,
        'POINT',
        2
    );
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_hostalaria_favoritos (
    id_lugar_hostalaria INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_lugares_hostalaria_fav PRIMARY KEY (id_lugar_hostalaria, id_usuario),
    CONSTRAINT fk_lugares_hostalaria_fav FOREIGN KEY (id_lugar_hostalaria) REFERENCES fresh_tour.lugares_hostalaria(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.lugares_hospedaxe_favoritos (
    id_lugar_hospedaxe INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_lugares_hospedaxe_fav PRIMARY KEY (id_lugar_hospedaxe, id_usuario),
    CONSTRAINT fk_lugares_hospedaxe_fav FOREIGN KEY (id_lugar_hospedaxe) REFERENCES fresh_tour.lugares_hospedaxe(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.actividades_ocio_favoritas (
    id_actividade_ocio INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_actividades_ocio_fav PRIMARY KEY (id_actividade_ocio, id_usuario),
    CONSTRAINT fk_actividades_ocio_fav FOREIGN KEY (id_actividade_ocio) REFERENCES fresh_tour.actividades_ocio(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.outras_actividades_favoritas(
    id_outra_actividade INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_outras_actividades_fav PRIMARY KEY (id_outra_actividade, id_usuario),
    CONSTRAINT fk_outras_actividades_fav FOREIGN KEY (id_outra_actividade) REFERENCES fresh_tour.outras_actividades(id),
    CONSTRAINT fk_usuarios_monumentos_fav FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_lugares_hostalaria (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR NOT NULL,
    id_lugar_hostalaria INT NOT NULL,
    CONSTRAINT pk_com_val_hostalaria PRIMARY KEY (id),
    CONSTRAINT fk_hostalaria FOREIGN KEY (id_lugar_hostalaria) REFERENCES fresh_tour.lugares_hostalaria(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_lugares_hospedaxe (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR NOT NULL,
    id_lugar_hospedaxe INT NOT NULL,
    CONSTRAINT pk_com_val_hospedaxe PRIMARY KEY (id),
    CONSTRAINT fk_hospedaxe FOREIGN KEY (id_lugar_hospedaxe) REFERENCES fresh_tour.lugares_hospedaxe(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_actividades_ocio (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR NOT NULL,
    id_actividade_ocio INT NOT NULL,
    CONSTRAINT pk_com_val_ocio PRIMARY KEY (id),
    CONSTRAINT fk_ocio FOREIGN KEY (id_actividade_ocio) REFERENCES fresh_tour.actividades_ocio(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.comentarios_valoracions_outras_actividades (
    id SERIAL NOT NULL,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data TIMESTAMP NOT NULL,
    valoracion FLOAT NOT NULL,
    comentario VARCHAR NOT NULL,
    id_outra_actividade INT NOT NULL,
    CONSTRAINT pk_com_val_outra PRIMARY KEY (id),
    CONSTRAINT fk_outra FOREIGN KEY (id_outra_actividade) REFERENCES fresh_tour.outras_actividades(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES fresh_tour.usuarios(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_lugares_hospedaxe (
    id_planificacion INT NOT NULL,
    id_lugar_hospedaxe INT NOT NULL,
    posicion_visita INT NOT NULL,
    duracion FLOAT,
    CONSTRAINT pk_plan_hospedaxe PRIMARY KEY (id_planificacion, id_lugar_hospedaxe),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_hospedaxe FOREIGN KEY (id_lugar_hospedaxe) REFERENCES fresh_tour.lugares_hospedaxe(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_lugares_hospedaxe (
    id SERIAL NOT NULL,
    id_lugar_hospedaxe INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP NOT NULL,
    CONSTRAINT pk_tempo_lugares_hospedaxe PRIMARY KEY (id),
    CONSTRAINT fk_hospedaxe FOREIGN KEY (id_lugar_hospedaxe) REFERENCES fresh_tour.lugares_hospedaxe(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_lugares_hostalaria (
    id_planificacion INT NOT NULL,
    id_lugar_hostalaria INT NOT NULL,
    posicion_visita INT NOT NULL,
    duracion FLOAT,
    CONSTRAINT pk_plan_hostalaria PRIMARY KEY (id_planificacion, id_lugar_hostalaria),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_hostalaria FOREIGN KEY (id_lugar_hostalaria) REFERENCES fresh_tour.lugares_hostalaria(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_lugares_hostalaria (
    id SERIAL NOT NULL,
    id_lugar_hostalaria INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP NOT NULL,
    CONSTRAINT pk_tempo_lugares_hostalaria PRIMARY KEY (id),
    CONSTRAINT fk_hostalaria FOREIGN KEY (id_lugar_hostalaria) REFERENCES fresh_tour.lugares_hostalaria(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_actividades_ocio (
    id_planificacion INT NOT NULL,
    id_actividade_ocio INT NOT NULL,
    posicion_visita INT NOT NULL,
    duracion FLOAT,
    CONSTRAINT pk_plan_ocio PRIMARY KEY (id_planificacion, id_actividade_ocio),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_ocio FOREIGN KEY (id_actividade_ocio) REFERENCES fresh_tour.actividades_ocio(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_actividades_ocio (
    id SERIAL NOT NULL,
    id_actividade_ocio INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP NOT NULL,
    CONSTRAINT pk_tempo_actividades_ocio PRIMARY KEY (id),
    CONSTRAINT fk_ocio FOREIGN KEY (id_actividade_ocio) REFERENCES fresh_tour.actividades_ocio(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.planificacions_outras_actividades (
    id_planificacion INT NOT NULL,
    id_outra_actividade INT NOT NULL,
    posicion_visita INT NOT NULL,
    duracion FLOAT,
    CONSTRAINT pk_plan_outra PRIMARY KEY (id_planificacion, id_outra_actividade),
    CONSTRAINT fk_planificacion FOREIGN KEY (id_planificacion) REFERENCES fresh_tour.planificacions(id),
    CONSTRAINT fk_outra FOREIGN KEY (id_outra_actividade) REFERENCES fresh_tour.outras_actividades(id)
);
CREATE TABLE IF NOT EXISTS fresh_tour.tempo_outras_actividades (
    id SERIAL NOT NULL,
    id_outra_actividade INT NOT NULL,
    tempo FLOAT NOT NULL,
    data TIMESTAMP NOT NULL,
    CONSTRAINT pk_tempo_outras_actividades PRIMARY KEY (id),
    CONSTRAINT fk_outra FOREIGN KEY (id_outra_actividade) REFERENCES fresh_tour.outras_actividades(id)
);
ALTER TABLE fresh_tour.lugares_hospedaxe ADD sub_tag varchar NOT NULL;
ALTER TABLE fresh_tour.lugares_hospedaxe ALTER COLUMN main_tag SET NOT NULL;
ALTER TABLE fresh_tour.lugares_hospedaxe ALTER COLUMN geom SET NOT NULL;
ALTER TABLE fresh_tour.lugares_hostalaria ALTER COLUMN main_tag SET NOT NULL;
ALTER TABLE fresh_tour.lugares_hostalaria ALTER COLUMN geom SET NOT NULL;
ALTER TABLE fresh_tour.lugares_hostalaria ADD sub_tag varchar NOT NULL;
ALTER TABLE fresh_tour.actividades_ocio ADD sub_tag varchar NOT NULL;
ALTER TABLE fresh_tour.actividades_ocio ALTER COLUMN main_tag SET NOT NULL;
ALTER TABLE fresh_tour.actividades_ocio ALTER COLUMN geom SET NOT NULL;
ALTER TABLE fresh_tour.outras_actividades ADD sub_tag varchar NOT NULL;
ALTER TABLE fresh_tour.outras_actividades ALTER COLUMN main_tag SET NOT NULL;
ALTER TABLE fresh_tour.outras_actividades ALTER COLUMN geom SET NOT NULL;
ALTER TABLE fresh_tour.lugares_hospedaxe ADD valoracion FLOAT;
ALTER TABLE fresh_tour.lugares_hostalaria ADD valoracion FLOAT;
ALTER TABLE fresh_tour.actividades_ocio ADD valoracion FLOAT;
ALTER TABLE fresh_tour.outras_actividades ADD valoracion FLOAT;
ALTER TABLE fresh_tour.lugares_turisticos ALTER COLUMN geom SET NOT NULL;
ALTER TABLE fresh_tour.monumentos ALTER COLUMN geom SET NOT NULL;


--- AUXILIAR TABLES
--- SCHEMA
CREATE SCHEMA fresh_tour_aux AUTHORIZATION postgres;
--- TABLE CREATION
CREATE TABLE fresh_tour_aux.lugares_turisticos_aux (
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
CREATE TABLE fresh_tour_aux.monumentos_aux (
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

--- OSM
CREATE EXTENSION hstore;
--- SCHEMA CREATIONS
CREATE SCHEMA IF NOT EXISTS osm_lugares_hospedaxe AUTHORIZATION postgres;
CREATE SCHEMA IF NOT EXISTS osm_lugares_hostaleria AUTHORIZATION postgres;
CREATE SCHEMA IF NOT EXISTS osm_actividades_ocio AUTHORIZATION postgres;
CREATE SCHEMA IF NOT EXISTS osm_outras_actividades AUTHORIZATION postgres;