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

UPDATE fresh_tour.fresh_tour.lugares_turisticos 
SET prezo = 4, prezo_reducido = 4, horario = 'Todos os días de 11:00-19:00 (xuño a outubro 10:00 a 20:00)',
comentario_visita_lenta = 'Recoméndase a visita pola monumental Igrexa do Monasteiro, o Museo do Monasteiro, do Claustro Procesional e a Escalera Abacial. Inclúese tamén a visita á área museística e de exposicións permanentes, así como de outras exposicións temporais que podan existir no lugar.',
comentario_visita_rapida = 'Recoméndase a visita pola monumental Igrexa do Monasteiro, do Claustro Procesional e a Escalera Abacial.',
tempo_visita_lenta = 90,
tempo_visita_rapida = 60,
url = 'https://www.espacioculturalsmpinario.com/exposiciones-temporales/',
contexto = '<p><a href="https://www.espacioculturalsmpinario.com/exposiciones-temporales/" target="_blank">San Marti&ntilde;o Pinario</a> foi o m&aacute;is influ&iacute;nte e grande dos mosteiros beneditinos de Galiza, e o segundo en tama&ntilde;o de toda Espa&ntilde;a tras o do Escorial.<br /><br />O seu museo incl&uacute;e a visita &aacute; igrexa, que destaca entre todas as da cidade polo seu impresionante baldaquino e polo cadeirado dos seus coros (o do coro alto &eacute; renacentista do s. XVII e pertenceu &aacute; Catedral).<br /><br />Ademais, en varias salas distintas exh&iacute;bese a s&uacute;a colecci&oacute;n de pintura, escultura, ourivar&iacute;a, restos arqueol&oacute;xicos, etc., as&iacute; como obxectos que falan do d&iacute;a a d&iacute;a dos monxes que o habitaron: a s&uacute;a imprenta, a botica, e o antigo gabinete de historia natural do mosteiro.</p>'
WHERE titulo LIKE 'Mosteiro e Igrexa de San Martiño Pinario'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Lugar público, sen horario',
comentario_visita_lenta = 'Recoméndase a visualización fundamentalmente da Catedral de Santiago de Compostela dende o mirador, así como de toda a vista que se pode ver dende o mesmo. Inclúese nesta visita a realización de fotografías. O tempo pode ascender dependendo da cantidade de xente. Os 15 minutos son aproximados con non demaisada cantidade de xente.',
comentario_visita_rapida = 'Recoméndase a visualización da Catedral de Santiago de Compostela e do resto de vistas dende o mirador.',
tempo_visita_lenta = 15,
tempo_visita_rapida = 5
WHERE titulo LIKE 'Parque da Alameda - Paseo da Ferradura'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 2.4, prezo_reducido = 1.2, horario = 'Martes a venres, de 9:30 a 20:30. Sábados de 11:00 a 19:30. Domingos e festivos, de 10:15 a 14:45.',
comentario_visita_lenta = 'Trátase dunha visita superficial do museo, únicamente recomendable cando se accede gratuitamente. Para ver cando isto é posible acceda á páxina web oficial do museo.',
comentario_visita_rapida = 'Inclúe unha visita detallada de todo o museo, con detemento en cada sala.',
tempo_visita_lenta = 90,
tempo_visita_rapida = 45
WHERE titulo LIKE 'Museo das Peregrinacións e de Santiago'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Luns a domingo de 8:00 a 20:00',
comentario_visita_lenta = 'Inclúese a visita ao edificio e a súa visualización con detemento, así como a visita á maior parte das exposicións que se atopen no edificio nese intre.',
comentario_visita_rapida = 'Inclúese a visita ao edificio e a súa visualización, e a visita a unha das exposicións existentes.',
tempo_visita_lenta = 240,
tempo_visita_rapida = 90
WHERE titulo LIKE 'Museo Centro Gaiás'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Lugar público, sen horario',
comentario_visita_lenta = 'Na visita lenta recoméndase unha estancia no alto do monte de máis de dúas horas, para poder disfrutar en plenitude de todo o que ofrece o alto do monte e os seus arredores (40 minutos son de subida a pé).',
comentario_visita_rapida = 'Na visita rápida recoméndase unha estancia no alto do monte de 30 minutos (40 minutos son de subida a pé), para poder visualizar tranquilamente as súas vistas e descansar.',
tempo_visita_lenta = 180,
tempo_visita_rapida = 80
WHERE titulo LIKE 'Monte Pedroso'

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