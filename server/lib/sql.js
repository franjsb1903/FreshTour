const sql = {};

sql.planificacions = {};

sql.planificacions.new = "INSERT INTO fresh_tour.planificacions (id_usuario, titulo, comentario, esta_compartida, valoracion, distancia, tempo_visita, tempo_ruta) VALUES ($1, $2, $3, $4, 0, $5, $6, $7) RETURNING id";
sql.planificacions.newLugares = "INSERT INTO fresh_tour.planificacions_lugares_turisticos (id_planificacion, id_lugar_turistico, posicion_visita) VALUES ";
sql.planificacions.newMonumentos = "INSERT INTO fresh_tour.planificacions_monumentos (id_planificacion, id_monumento, posicion_visita) VALUES ";
sql.planificacions.all = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, (SELECT id FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS id_actual_usuario, 'Planificación' AS tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.planificacions_favoritas pf WHERE pf.id_planificacion = p.id AND pf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.planificacions p WHERE esta_compartida = true"
sql.planificacions.share = "UPDATE fresh_tour.planificacions SET esta_compartida = $1 WHERE id = $2";
sql.planificacions.elementos = "SELECT *, 'Lugar turístico' AS tipo FROM fresh_tour.lugares_turisticos lt WHERE lt.id IN (SELECT id_lugar_turistico FROM fresh_tour.planificacions_lugares_turisticos plt WHERE plt.id_planificacion = $1) UNION all SELECT *, 'Monumento' AS tipo FROM fresh_tour.monumentos m WHERE m.id IN (SELECT id_monumento FROM fresh_tour.planificacions_monumentos pm WHERE pm.id_planificacion = $1)"
sql.planificacions.delete = {}
sql.planificacions.delete.lugares = "DELETE FROM fresh_tour.planificacions_lugares_turisticos WHERE id_planificacion = $1";
sql.planificacions.delete.monumentos = "DELETE FROM fresh_tour.planificacions_monumentos WHERE id_planificacion = $1";
sql.planificacions.delete.planificacion = "DELETE FROM fresh_tour.planificacions WHERE id = $1";
sql.planificacions.delete.comentarios = "DELETE FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1";
sql.planificacions.delete.favoritas = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_planificacion = $1";
sql.planificacions.edit = "UPDATE fresh_tour.planificacions SET titulo = $1, comentario = $2 WHERE id = $3";

module.exports = sql;