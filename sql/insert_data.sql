---     psql -d fresh_tour < insert_data.sql
--- DATA FROM CSV
--- CHANGE THE URL IF THE CSV FILE IS IN ANOTHER LOCATION
--- LUGARES_TURISTICOS
COPY fesh_tour_aux.lugares_turisticos_aux
FROM '../datos/lugares_turisticos.csv' DELIMITER ',' CSV HEADER;
--- MONUMENTOS
COPY fesh_tour_aux.monumentos_aux
FROM '../datos/monumentos.csv' DELIMITER ',' CSV HEADER;

--- COPY DATA FROM AUX TABLES WITH CORRECT ATTRIBUTES

--- LUGARES TURISTICOS
INSERT INTO fresh_tour.fresh_tour.lugares_turisticos (
        titulo,
        cp,
        contexto,
        resumo,
        pais,
        municipio,
        direccion,
        url,
        data_adicion,
        data_modificacion,
        tempo_visita_rapida,
        tempo_visita_lenta,
        tempo_visita_usuario,
        valoracion,
        comentario_visita_rapida,
        comentario_visita_lenta
    )
SELECT titulo,
    CAST(localizacion_codigo_postal as INT),
    contenido as contexto,
    resumen as resumo,
    localizacion_pais as pais,
    localizacion_municipio as municipio,
    localizacion_direccion as direccion,
    extra_url as url,
    current_timestamp,
    current_timestamp,
    0,
    0,
    0,
    0,
    '',
    ''
FROM fresh_tour.fesh_tour_aux.lugares_turisticos_aux

--- MONUMENTOS
INSERT INTO fresh_tour.fresh_tour.monumentos (
        titulo,
        cp,
        contexto,
        resumo,
        pais,
        municipio,
        direccion,
        url,
        data_adicion,
        data_modificacion,
        tempo_visita_rapida,
        tempo_visita_lenta,
        tempo_visita_usuario,
        valoracion,
        comentario_visita_rapida,
        comentario_visita_lenta
    )
SELECT titulo,
    CAST(localizacion_codigo_postal as INT),
    contenido as contexto,
    resumen as resumo,
    localizacion_pais as pais,
    localizacion_municipio as municipio,
    localizacion_direccion as direccion,
    extra_url as url,
    current_timestamp,
    current_timestamp,
    0,
    0,
    0,
    0,
    '',
    ''
FROM fresh_tour.fesh_tour_aux.monumentos_aux 

--- CREATE POINT FROM LATITUDE AND LONGITUDE IN AUXILIAR TABLE

--- LUGARES TURISTICOS
with recursive set_points as (
	select titulo, cast(latitude as float), cast(longitude as float)
	from fesh_tour_aux.lugares_turisticos_aux 
	union
	select lta.titulo, cast(lta.latitude as float), cast(lta.longitude as float)
	from lugares_turisticos lt, fesh_tour_aux.lugares_turisticos_aux lta, set_points 
	where set_points.titulo like lt.titulo 
)
update fresh_tour.fresh_tour.lugares_turisticos 
set geom = st_makepoint(longitude, latitude) 
from set_points
where fresh_tour.fresh_tour.lugares_turisticos.titulo like set_points.titulo

--- MONUMENTOS
with recursive set_points as (
	select titulo, cast(latitude as float), cast(longitude as float)
	from fesh_tour_aux.monumentos_aux
	union
	select ma.titulo, cast(ma.latitude as float), cast(ma.longitude as float)
	from monumentos m2, fesh_tour_aux.monumentos_aux ma , set_points 
	where set_points.titulo like m2.titulo 
)
update fresh_tour.fresh_tour.monumentos 
set geom = st_makepoint(longitude, latitude) 
from set_points
where fresh_tour.fresh_tour.monumentos.titulo like set_points.titulo

select * from monumentos m 