const sql = {};

sql.planificacions = {};
sql.planificacions.new = "INSERT INTO fresh_tour.planificacions (id_usuario, titulo, comentario, esta_compartida, valoracion, distancia, tempo_visita, tempo_ruta) VALUES ($1, $2, $3, $4, 0, $5, $6, $7) RETURNING id";
sql.planificacions.newLugares = "INSERT INTO fresh_tour.planificacions_lugares_turisticos (id_planificacion, id_lugar_turistico, posicion_visita, tipo_visita) VALUES ";
sql.planificacions.newMonumentos = "INSERT INTO fresh_tour.planificacions_monumentos (id_planificacion, id_monumento, posicion_visita, tipo_visita) VALUES ";
sql.planificacions.all = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY valoracion DESC"
sql.planificacions.share = "UPDATE fresh_tour.planificacions SET esta_compartida = $1 WHERE id = $2";
sql.planificacions.elementos = "SELECT *, 'Lugar turístico' AS tipo, (SELECT tipo_visita FROM fresh_tour.planificacions_lugares_turisticos plt WHERE plt.id_lugar_turistico = lt.id AND plt.id_planificacion = $1) as tipo_visita FROM fresh_tour.lugares_turisticos lt WHERE lt.id IN (SELECT id_lugar_turistico FROM fresh_tour.planificacions_lugares_turisticos plt WHERE plt.id_planificacion = $1) UNION all SELECT *, 'Monumento' AS tipo, (SELECT tipo_visita FROM fresh_tour.planificacions_monumentos pm WHERE pm.id_monumento = m.id AND pm.id_planificacion = $1) as tipo_visita FROM fresh_tour.monumentos m WHERE m.id IN (SELECT id_monumento FROM fresh_tour.planificacions_monumentos pm WHERE pm.id_planificacion = $1)"
sql.planificacions.delete = {}
sql.planificacions.delete.lugares = "DELETE FROM fresh_tour.planificacions_lugares_turisticos WHERE id_planificacion = $1";
sql.planificacions.delete.monumentos = "DELETE FROM fresh_tour.planificacions_monumentos WHERE id_planificacion = $1";
sql.planificacions.delete.planificacion = "DELETE FROM fresh_tour.planificacions WHERE id = $1";
sql.planificacions.delete.comentarios = "DELETE FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1";
sql.planificacions.delete.favoritas = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_planificacion = $1";
sql.planificacions.edit = "UPDATE fresh_tour.planificacions SET titulo = $1, comentario = $2 WHERE id = $3";
sql.planificacions.sortBy = {};
sql.planificacions.sortBy.valoracion = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY valoracion DESC";
sql.planificacions.sortBy.menorDistancia = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY distancia ASC";
sql.planificacions.sortBy.maiorDistancia = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY distancia DESC";
sql.planificacions.sortBy.maiorTempoVisita = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY tempo_visita DESC";
sql.planificacions.sortBy.menorTempoVisita = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY tempo_visita ASC";
sql.planificacions.sortBy.maiorTempoRuta = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY tempo_ruta DESC";
sql.planificacions.sortBy.menorTempoRuta = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY tempo_ruta ASC";
sql.planificacions.sortBy.menorTempoTotalRuta = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY (tempo_ruta+tempo_visita) ASC";
sql.planificacions.sortBy.maiorTempoTotalRuta = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true ORDER BY (tempo_ruta+tempo_visita) DESC";
sql.planificacions.fav = {};
sql.planificacions.fav.sortBy = {};
sql.planificacions.fav.sortBy.valoracion = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY valoracion DESC";
sql.planificacions.fav.sortBy.menorDistancia = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY distancia ASC";
sql.planificacions.fav.sortBy.maiorDistancia = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY distancia DESC";
sql.planificacions.fav.sortBy.maiorTempoVisita = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY tempo_visita DESC";
sql.planificacions.fav.sortBy.menorTempoVisita = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY tempo_visita ASC";
sql.planificacions.fav.sortBy.maiorTempoRuta = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY tempo_ruta DESC";
sql.planificacions.fav.sortBy.menorTempoRuta = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY tempo_ruta ASC";
sql.planificacions.fav.sortBy.menorTempoTotalRuta = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY (tempo_ruta+tempo_visita) ASC";
sql.planificacions.fav.sortBy.maiorTempoTotalRuta = "SELECT *,'Planificación' as tipo, true AS favorito, $2 AS id_actual_usuario FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1) ORDER BY (tempo_ruta+tempo_visita) DESC";
sql.planificacions.get = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, $2 AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true and (p.id in (select id_planificacion from fresh_tour.planificacions_lugares_turisticos plt where plt.id_lugar_turistico in (select id from fresh_tour.lugares_turisticos where titulo like $2)) or p.id in (select id_planificacion from fresh_tour.planificacions_monumentos pm where pm.id_monumento in (select id from fresh_tour.monumentos where titulo like $2)) or p.titulo like $2) ORDER BY valoracion DESC"

sql.usuarios = {};
sql.usuarios.edit = "UPDATE fresh_tour.usuarios SET usuario=$1, nome=$2, apelidos=$3, email=$4, contrasinal=$5 WHERE id=$6 RETURNING usuario, nome, apelidos, email, to_char(data, 'DD-MM-YY') as data";
sql.usuarios.exists= "SELECT usuario, email FROM fresh_tour.usuarios WHERE usuario LIKE $1 OR email LIKE $2";
sql.usuarios.delete = {};
sql.usuarios.delete.lugaresFav = "DELETE FROM fresh_tour.lugares_turisticos_favoritos WHERE id_usuario = $1";
sql.usuarios.delete.monumentosFav = "DELETE FROM fresh_tour.monumentos_favoritos WHERE id_usuario = $1";
sql.usuarios.delete.planificacionsFav = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_usuario = $1";
sql.usuarios.delete.comentariosLugares = "DELETE FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_usuario = $1 RETURNING id_lugar_turistico";
sql.usuarios.delete.comentariosMonumentos = "DELETE FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_usuario = $1 RETURNING id_monumento";
sql.usuarios.delete.comentariosPlanificacions = "DELETE FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_usuario = $1";
sql.usuarios.delete.planificacionsId = "SELECT id FROM fresh_tour.planificacions WHERE id_usuario = $1";
sql.usuarios.delete.user = "DELETE FROM fresh_tour.usuarios WHERE id = $1";
sql.usuarios.new = "INSERT INTO fresh_tour.usuarios (usuario, nome, apelidos, email, contrasinal, data) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING id, usuario, nome, apelidos, email, to_char(data, 'DD-MM-YY') as data";
sql.usuarios.get = {};
sql.usuarios.get.user = "SELECT id, usuario, nome, apelidos, email, contrasinal, to_char(data, 'DD-MM-YY') as data FROM fresh_tour.usuarios WHERE usuario LIKE $1 OR email LIKE $1";
sql.usuarios.get.byId = "SELECT id, usuario, nome, apelidos, email, to_char(data, 'DD-MM-YY') as data FROM fresh_tour.usuarios WHERE id = $1";
sql.usuarios.get.elementosFav = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1)";
sql.usuarios.get.plansFav = "SELECT * FROM fresh_tour.planificacions p2 WHERE id IN ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1)";
sql.usuarios.get.opinions = "SELECT id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_lugar_turistico as id_elemento,'Lugar turístico' as tipo, (select titulo from fresh_tour.lugares_turisticos where id = cvlt.id_lugar_turistico) as elemento FROM fresh_tour.comentarios_valoracions_lugares_turisticos cvlt WHERE id_usuario = $1 UNION ALL select id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_monumento as id_elemento, 'Monumento' as tipo, (select titulo from fresh_tour.monumentos where id = cvm.id_monumento) as elemento FROM fresh_tour.comentarios_valoracions_monumentos cvm WHERE id_usuario = $1 UNION ALL select id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_planificacion as id_elemento, 'Planificacion' as tipo, (select titulo from fresh_tour.planificacions where id = cvp.id_planificacion) FROM fresh_tour.comentarios_valoracions_planificacions cvp WHERE id_usuario = $1";
sql.usuarios.get.plans = "SELECT *, 'Planificación' as tipo FROM fresh_tour.planificacions p WHERE id_usuario = $1";

sql.elementos = {};
sql.elementos.sortBy = {};
sql.elementos.sortBy.titulo = "SELECT *, 'Lugar turístico' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE ltf.id_lugar_turistico = lt.id AND ltf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL UNION ALL SELECT *, 'Monumento' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.monumentos_favoritos mf WHERE mf.id_monumento = m.id AND mf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.monumentos m WHERE m.prezo is not NULL ORDER BY titulo ASC"
sql.elementos.sortBy.valoracion = "SELECT *, 'Lugar turístico' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE ltf.id_lugar_turistico = lt.id AND ltf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL UNION ALL SELECT *, 'Monumento' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.monumentos_favoritos mf WHERE mf.id_monumento = m.id AND mf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.monumentos m WHERE m.prezo is not NULL ORDER BY valoracion DESC"
sql.elementos.updateValoracion = {};
sql.elementos.updateValoracion.mediaLugares = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_lugar_turistico = $1";
sql.elementos.updateValoracion.updateLugares = "UPDATE fresh_tour.lugares_turisticos SET valoracion = $1 WHERE id = $2"
sql.elementos.updateValoracion.mediaMonumentos = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_monumento = $1";
sql.elementos.updateValoracion.updateMonumentos = "UPDATE fresh_tour.monumentos SET valoracion = $1 WHERE id = $2"
sql.elementos.byName = "SELECT *, 'Lugar turístico' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE ltf.id_lugar_turistico = lt.id AND ltf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.lugares_turisticos lt WHERE lt.prezo is not NULL AND lt.titulo LIKE $2 UNION ALL SELECT *, 'Monumento' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.monumentos_favoritos mf WHERE mf.id_monumento = m.id AND mf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.monumentos m WHERE m.prezo is not NULL AND m.titulo LIKE $2 ORDER BY titulo ASC"
sql.elementos.favs = {};
sql.elementos.favs.sortBy = {};
sql.elementos.favs.sortBy.titulo = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1) ORDER BY titulo ASC";
sql.elementos.favs.sortBy.valoracion = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1) ORDER BY titulo DESC";
sql.elementos.favs.new = {};
sql.elementos.favs.new.lugares = "INSERT INTO fresh_tour.lugares_turisticos_favoritos (id_usuario, id_lugar_turistico) values ($1, $2)";
sql.elementos.favs.new.monumentos = "INSERT INTO fresh_tour.monumentos_favoritos (id_usuario, id_monumento) values ($1, $2)";
sql.elementos.favs.new.planificacions = "INSERT INTO fresh_tour.planificacions_favoritas (id_usuario, id_planificacion) values ($1, $2)";
sql.elementos.favs.delete = {};
sql.elementos.favs.delete.lugares = "DELETE FROM fresh_tour.lugares_turisticos_favoritos WHERE id_usuario = $1 and id_lugar_turistico = $2";
sql.elementos.favs.delete.monumentos = "DELETE FROM fresh_tour.monumentos_favoritos WHERE id_usuario = $1 and id_monumento = $2";
sql.elementos.favs.delete.planificacions = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_usuario = $1 and id_planificacion = $2";
sql.elementos.favs.all = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1)";
sql.elementos.favs.byName = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) and titulo LIKE $2 UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1) and titulo LIKE $2";

sql.opinions = {};
sql.opinions.get = {};
sql.opinions.get.lugares = {};
sql.opinions.get.lugares.get = "select cvlt.id, id_usuario, usuario, titulo, valoracion, comentario, id_lugar_turistico as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_lugares_turisticos cvlt inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvlt.id_usuario = usuarios.id where cvlt.id_lugar_turistico = $1 order by data asc";
sql.opinions.get.lugares.count_valoracion = "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_lugares_turisticos where id_lugar_turistico = $1";
sql.opinions.get.monumentos = {};
sql.opinions.get.monumentos.get = "select cvm.id, id_usuario, usuario, titulo, valoracion, comentario, id_monumento as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_monumentos cvm inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvm.id_usuario = usuarios.id where cvm.id_monumento = $1 order by data asc";
sql.opinions.get.monumentos.count_valoracion = "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_monumentos where id_monumento = $1";
sql.opinions.get.planificacions = {};
sql.opinions.get.planificacions.get = "select cvp.id, id_usuario, usuario, titulo, valoracion, comentario, id_planificacion as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_planificacions cvp inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvp.id_usuario = usuarios.id where cvp.id_planificacion = $1 order by data asc";
sql.opinions.get.planificacions.count_valoracion = "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_planificacions where id_planificacion = $1";
sql.opinions.exists = {};
sql.opinions.exists.lugares = "SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_usuario = $1 AND id_lugar_turistico = $2";
sql.opinions.exists.monumentos = "SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_usuario = $1 AND id_monumento = $2";
sql.opinions.exists.planificacions = "SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_usuario = $1 AND id_planificacion = $2";
sql.opinions.new = {};
sql.opinions.new.lugares = {};
sql.opinions.new.lugares.insert = "INSERT INTO fresh_tour.comentarios_valoracions_lugares_turisticos(id_usuario, titulo, data, valoracion, comentario, id_lugar_turistico) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_lugar_turistico";
sql.opinions.new.lugares.media = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_lugar_turistico = $1";
sql.opinions.new.lugares.updateVal = "UPDATE fresh_tour.lugares_turisticos SET valoracion = $1 WHERE id = $2 RETURNING valoracion";
sql.opinions.new.monumentos = {};
sql.opinions.new.monumentos.insert = "INSERT INTO fresh_tour.comentarios_valoracions_monumentos(id_usuario, titulo, data, valoracion, comentario, id_monumento) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_monumento"
sql.opinions.new.monumentos.media = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_monumento = $1";
sql.opinions.new.monumentos.updateVal = "UPDATE fresh_tour.monumentos SET valoracion = $1 WHERE id = $2 RETURNING valoracion";
sql.opinions.new.planificacions = {};
sql.opinions.new.planificacions.insert = "INSERT INTO fresh_tour.comentarios_valoracions_planificacions(id_usuario, titulo, data, valoracion, comentario, id_planificacion) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_planificacion";
sql.opinions.new.planificacions.media = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1";
sql.opinions.new.planificacions.updateVal = "UPDATE fresh_tour.planificacions SET valoracion = $1 WHERE id = $2 RETURNING valoracion";
sql.opinions.delete = {};
sql.opinions.delete.lugares = "DELETE FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id = $1";
sql.opinions.delete.monumentos = "DELETE FROM fresh_tour.comentarios_valoracions_monumentos WHERE id = $1";
sql.opinions.delete.planificacions = "DELETE FROM fresh_tour.comentarios_valoracions_planificacions WHERE id = $1";
sql.opinions.edit = {};
sql.opinions.edit.lugares = "UPDATE fresh_tour.comentarios_valoracions_lugares_turisticos SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";
sql.opinions.edit.monumentos = "UPDATE fresh_tour.comentarios_valoracions_monumentos SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";
sql.opinions.edit.planificacions = "UPDATE fresh_tour.comentarios_valoracions_planificacions SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";

module.exports = sql;