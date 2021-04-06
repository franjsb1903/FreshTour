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
contexto = 'O complexo, que ocupa uns 20.000 metros cadrados, é un dos maiores edificios deste tipo en España e actualmente alberga o Seminario Maior e un establecemento hoteleiro. Ademais, ten un museo cunha exposición permanente, incluída a igrexa con retablos e os postos do coro.',
resumo = 'O complexo, que ocupa uns 20.000 metros cadrados, é un dos maiores edificios deste tipo en España e actualmente alberga o Seminario Maior e un establecemento hoteleiro. Ademais, ten un museo cunha exposición permanente, incluída a igrexa con retablos e os postos do coro. Este mosteiro xorde na praza da Inmaculada, fundado por un grupo de beneditinos que, pouco despois do descubrimento dos restos do apóstolo, instaláronse nun lugar chamado Pignario, preto da capela de Corticela (hoxe integrada na catedral)., onde celebraron os seus oficios. O maior desenvolvemento comezou cando en 1494 pasou a depender da congregación beneditina de Valladolid. A partir de aquí alcanzarán a riqueza que lles permitirá pagar as impoñentes obras da igrexa, que constitúe, xunto coa Catedral, a colección máis valiosa do barroco galego. Durante 1991, despois de reformar as salas monásticas e limpar e restaurar os valiosos retablos, acolleu a exposición antolóxica de arte galega 'Galicia no tempo'. No 2000, cando Santiago celebrou a súa capital cultural, acolleu a exposición 'As Faces de Deus'. Para saber máis sobre este lugar de interese turístico, recomendámoslle que visite a súa páxina web.'
WHERE titulo LIKE 'Mosteiro e Igrexa de San Martiño Pinario'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Lugar público, sen horario',
comentario_visita_lenta = 'Recoméndase a visualización fundamentalmente da Catedral de Santiago de Compostela dende o mirador, así como de toda a vista que se pode ver dende o mesmo. Inclúese nesta visita a realización de fotografías. O tempo pode ascender dependendo da cantidade de xente. Os 15 minutos son aproximados con non demaisada cantidade de xente.',
comentario_visita_rapida = 'Recoméndase a visualización da Catedral de Santiago de Compostela e do resto de vistas dende o mirador.',
tempo_visita_lenta = 15,
tempo_visita_rapida = 5,
resumo = 'O miradoiro urbano máis coñecido e admirado é o paseo da Ferradura, situado no parque da Alameda, no lado oriental do outeiro de Santa Susana. Desde alí, unha espectacular vista frontal da catedral sobresaíndo magnífica entre a masa de edificios históricos: é a postal máis retratada, a imaxe máis atemporal da cidade. Recomendado a calquera hora do día, este punto de vista é esencial pola noite para comprender verdadeiramente por que a catedral foi e será un "faro" espiritual.',
contexto = 'O miradoiro urbano máis coñecido e admirado é o paseo da Ferradura, situado no parque da Alameda, no lado oriental do outeiro de Santa Susana. Desde alí, unha espectacular vista frontal da catedral sobresaíndo magnífica entre a masa de edificios históricos.'
WHERE titulo LIKE 'Parque da Alameda - Paseo da Ferradura'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 2.4, prezo_reducido = 1.2, horario = 'Martes a venres, de 9:30 a 20:30. Sábados de 11:00 a 19:30. Domingos e festivos, de 10:15 a 14:45.',
comentario_visita_lenta = 'Trátase dunha visita superficial do museo, únicamente recomendable cando se accede gratuitamente. Para ver cando isto é posible acceda á páxina web oficial do museo.',
comentario_visita_rapida = 'Inclúe unha visita detallada de todo o museo, con detemento en cada sala.',
tempo_visita_lenta = 90,
tempo_visita_rapida = 45,
contexto = 'O Museo das Peregrinacións e de Santiago é un complexo museístico creado en Santiago de Compostela en 1951 e dedicado ao feito cultural da peregrinación, no contexto do Camiño de Santiago, a catedral e o fenómeno xacobeo da tumba do Apóstolo Santiago. Foi declarado Ben de Interese Cultural en 1985.',
resumo = 'O Museo das Peregrinacións e de Santiago ocupa o edificio do antigo Banco de España, proxectado en 1939 polo arquitecto Romualdo Madariaga Céspedes e construído na parcela das casas Espinosa. Está situado na praza de Platerías, a poucos metros da fachada sur da catedral. Na súa planta baixa hai 5 arcos sobre columnas que forman soportais. Cos seus case 3.500 metros cadrados de superficie construída, a antiga sede do Banco de España na cidade forma parte deste o complexo museístico desde xullo de 2012 xunto coa Casa do Cabido. Desde a gran claraboia do segundo andar pódese ver a basílica compostelá coa súa impresionante torre Berenguela e gran parte do centro histórico.'
WHERE titulo LIKE 'Museo das Peregrinacións e de Santiago'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Luns a domingo de 8:00 a 20:00',
comentario_visita_lenta = 'Inclúese a visita ao edificio e a súa visualización con detemento, así como a visita á maior parte das exposicións que se atopen no edificio nese intre.',
comentario_visita_rapida = 'Inclúese a visita ao edificio e a súa visualización, e a visita a unha das exposicións existentes.',
tempo_visita_lenta = 240,
tempo_visita_rapida = 90,
contexto = 'Chamado a ser un referente arquitectónico do século XXI, o Museo Centro Gaiás é un dos edificios máis singulares e con máis posibilidades de uso na Cidade da Cultura, que aspira a converterse no centro expositivo de referencia en Galicia.',
resumo = 'Chamado a ser un referente arquitectónico do século XXI, o Museo Centro Gaiás é un dos edificios máis singulares e con máis posibilidades de uso na Cidade da Cultura, que aspira a converterse no centro expositivo de referencia en Galicia. A espectacularidade da súa fachada, os case 43 metros de altura e os seus máis de 16.000 metros cadrados de superficie permiten ao Museo Centro Gaiás amosar unha serie de actividades formativas e divulgativas que o converten nun centro activo en continua renovación. O Museo Centro Gaiás ten unha superficie expositiva de 6.600 metros cadrados, dividida en tres plantas, na que alberga exposicións temporais de gran profundidade e instalacións que, polo seu tamaño, non se puideron exhibir noutros centros culturais de Galicia. O edificio ten un servizo de cafetería-restaurante situado na planta 0, xunto ao Salón Tirantes. Este espazo gastronómico está aberto de luns a domingo de 8:00 a 20:00 e ten dúas terrazas, unha exterior e outra interior no propio vestíbulo do museo.'
WHERE titulo LIKE 'Museo Centro Gaiás'

UPDATE fresh_tour.fresh_tour.lugares_turisticos
SET prezo = 0, prezo_reducido = 0, horario = 'Lugar público, sen horario',
comentario_visita_lenta = 'Na visita lenta recoméndase unha estancia no alto do monte de máis de dúas horas, para poder disfrutar en plenitude de todo o que ofrece o alto do monte e os seus arredores (40 minutos son de subida a pé).',
comentario_visita_rapida = 'Na visita rápida recoméndase unha estancia no alto do monte de 30 minutos (40 minutos son de subida a pé), para poder visualizar tranquilamente as súas vistas e descansar.',
tempo_visita_lenta = 180,
tempo_visita_rapida = 80,
resumo = 'O monte Pedroso, no oeste, é o máis emblemático da cidade. Protexido durante anos da construción para que ningún edificio poida competir nunca en altura ou visibilidade coa Basílica do Apóstolo, é o miradoiro por excelencia para descubrir a cidade cubrindo a paisaxe e a catedral que dá ao solpor. Calquera hora é boa para subir alí, pero ao solpor é especial, porque é cando os últimos raios dourados da tarde se reflicten no templo. Dende a cidade, pódese acceder ao pico do Pedroso nun paseo duns 40 minutos que sae de Ponte Asén, no parque das Galeras, e atravesa a aldea de Casas Novas, para continuar polo camiño ascendente marcado polo Vía Crucis. Para chegar en coche, tome a estrada que comeza no Carme de Abaixo e logo tome o desvío á dereita, seguindo as indicacións dos repetidores de televisión.',
contexto = 'O monte Pedroso, no oeste, é o máis emblemático da cidade. Protexido durante anos da construción para que ningún edificio poida competir nunca en altura ou visibilidade coa Basílica do Apóstolo, é o miradoiro por excelencia para descubrir a cidade cubrindo a paisaxe e a catedral que dá ao solpor.'
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