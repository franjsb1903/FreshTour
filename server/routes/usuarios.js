/**
 * @fileoverview Operacións relacionadas cos usuarios
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/
var express = require('express');                   // Instancia de express
var router = express.Router();                      // Instancia de router para crear rutas

const helpers = require('../lib/helpers');          // Funcións comúns
var bcrypt = require('bcryptjs');                   // Instancia de bcrypt, para o hasheo de contrasinais
const pool = require('../../database/database');    // Instancia para executar queries na BBDD
const verify = require('../lib/VerifyToken');       // Verifica o token de usuario, empregado como middleware
const sql = require('../lib/sql');                  // Obxecto que reúne todas as consultas a empregar

// postEdit()
/**
 * Edición dos datos dun usuario
 */
router.post('/edit', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;
        const { usuario, nome, apelidos, email, contrasinal } = req.body;

        // Hasheo do contrasinal para almacenalo na BBDD
        var hashedPssw = bcrypt.hashSync(contrasinal, 10);

        const values = [usuario, nome, apelidos, email, hashedPssw, userId];

        // Conexión ca BBDD
        pool.connect((err, client, done) => {
            const shouldAbort = err => {
                if (err) {
                    client.query('ROLLBACK', error => {
                        if (error) {
                            helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                            return;
                        }

                        done()
                        helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                        return;
                    })
                }
                return !!err
            }

            // Comezo da transacción
            client.query('BEGIN', err => {
                if (shouldAbort(err)) return;

                // Comprobación de se o usuario xa existe na BBDD
                client.query(sql.usuarios.exists, [usuario, email], (err, results) => {
                    if (shouldAbort(err)) return;

                    if (results.rowCount > 0) {
                        console.log(userId, results.rows[0].id);
                        if (userId != results.rows[0].id && email == results.rows[0].email) {
                            helpers.onErrorAuth(401, "Email xa rexistrado na plataforma", err, res);
                            return;
                        } else if (userId != results.rows[0].id && usuario == results.rows[0].usuario) {
                            helpers.onErrorAuth(401, "Nome de usuario xa existente", err, res);
                            return;
                        }
                    }

                    // Edición dos datos do usuario
                    client.query(sql.usuarios.edit, values, (err, results) => {
                        if (shouldAbort(err)) return;

                        // Confirmación dos cambios
                        client.query('COMMIT', error => {
                            if (error) {
                                helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", error, res);
                                return;
                            }
                            try {
                                const { id, usuario, nome, apelidos, email, data } = results.rows[0];

                                const user = {
                                    id: id,
                                    usuario: usuario,
                                    nome: nome,
                                    apelidos: apelidos,
                                    email: email,
                                    data: data
                                }

                                done();

                                // Resposta
                                return res.status(200).send({ auth: true, user: user, status: 200 });

                            } catch (err) {
                                helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                                return;
                            }
                        })
                    });
                });
            })
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// delete()
/**
 * Eliminación dunha conta de usuario
 */
router.delete('/', verify.verifyToken, async (req, res) => {
    
    // Conexión ca BBDD
    const client = await pool.connect();
    try {

        const userId = req.userId;

        // Eliminación da relación cos lugares favoritos do usuario
        await client.query(sql.usuarios.delete.lugaresFav, [userId]);
        // Eliminación da relación cos monumentos favoritos do usuario
        await client.query(sql.usuarios.delete.monumentosFav, [userId]);
        // Eliminación da relación cas planificacións favoritas do usuario
        await client.query(sql.usuarios.delete.planificacionsFav, [userId]);
        // Eliminación de comentarios para cada tipo posible e actualización da valoración nas súas correspondentes táboas
        const lugares = await client.query(sql.usuarios.delete.comentariosLugares, [userId]);
        await Promise.all(lugares.rows.map(async (item) => {
            const results = await client.query(sql.elementos.updateValoracion.mediaLugares, [item.id_lugar_turistico]);
            var media = results.rows[0].media;
            if(media == null) {
                media = 0;
            }
            await client.query(sql.elementos.updateValoracion.updateLugares, [media, item.id_lugar_turistico]);
        }));
        const monumentos = await client.query(sql.usuarios.delete.comentariosMonumentos, [userId]);
        await Promise.all(monumentos.rows.map(async (item) => {
            const results = await client.query(sql.elementos.updateValoracion.mediaMonumentos, [item.id_monumento]);
            var media = results.rows[0].media;
            if(media == null) {
                media = 0;
            }
            await client.query(sql.elementos.updateValoracion.updateMonumentos, [media, item.id_monumento]);
        }));
        await client.query(sql.usuarios.delete.comentariosPlanificacions, [userId]);
        const response = await client.query(sql.usuarios.delete.planificacionsId, [userId]);
        await Promise.all(response.rows.map(async (item) => {
            await client.query(sql.planificacions.delete.lugares, [item.id]);
            await client.query(sql.planificacions.delete.monumentos, [item.id]);
            await client.query(sql.planificacions.delete.planificacion, [item.id]);
        }));
        // Eliminación do usuario
        await client.query(sql.usuarios.delete.user, [userId]);
        // Confirmación de cambios
        await client.query('COMMIT');

        // Resposta
        return res.status(200).send({ auth: false, status: 200 });
    } catch (err) {
        // En caso de erro, rollback
        await client.query('ROLLBACK');
        helpers.onError(500, "Erro interno do servidor", err, res);
    } finally {
        // Ao finalizar, cérrase a conexión
        client.release();
    }
})

module.exports = router;