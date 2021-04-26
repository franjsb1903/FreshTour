const sql = {};

sql.planificacions = {};

sql.planificacions.new = "INSERT INTO fresh_tour.planificacions (id_usuario, titulo, comentario, esta_compartida, valoracion, distancia, tempo_visita, tempo_ruta) VALUES ($1, $2, $3, $4, 0, $5, $6, $7) RETURNING id";
sql.planificacions.newLugares = "INSERT INTO fresh_tour.planificacions_lugares_turisticos (id_planificacion, id_lugar_turistico, posicion_visita) VALUES ";
sql.planificacions.newMonumentos = "INSERT INTO fresh_tour.planificacions_monumentos (id_planificacion, id_monumento, posicion_visita) VALUES ";
sql.planificacions.all = "SELECT *, (SELECT usuario FROM fresh_tour.usuarios u WHERE id = p.id_usuario) AS usuario, 'Planificación' AS tipo FROM fresh_tour.planificacions p WHERE esta_compartida = true"
sql.planificacions.share = "UPDATE fresh_tour.planificacions SET esta_compartida = $1 WHERE id = $2";

module.exports = sql;