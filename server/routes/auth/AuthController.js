/**
 * @fileoverview Rexistro e login de usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

var express = require('express');                                   // Instancia de express
var router = express.Router();                                      // Instancia de router de express para xerar as rutas
var jwt = require('jsonwebtoken');                                  // Instancia de JWT
var bcrypt = require('bcryptjs');                                   // Instancia de bcrypt
var config = require('../../config/config');                        // Instancia de config, onde se atopa a clave secreta

const helpers = require('../../lib/helpers');                       // Instancia de helpers, onde se atopan funcionalidades comúns
const sql = require('../../lib/sql');                               // Instancia de sql, onde se atopan as consultas
const pool = require('../../../database/database');                 // Instancia de pool, que permite realizar consultas sobre a BBDD
const tag_traductor = require('../../lib/tag_traductor');           // Instancia do traductor de etiquetas ao galego

var verify = require('../../lib/VerifyToken');                      // Instancia do verificador de token de usuario

// postRegister()
/**
 * Permite o rexistro dun usuario na BBDD
 */
router.post('/register', (req, res) => {

    const { usuario, nome, apelidos, email, contrasinal } = req.body;                   // No corpo da función recibe os datos necesarios para o rexistro
                                                                                        // Verificación dos campos
    if (!usuario || usuario == '' || usuario.length > 50 || nome == undefined  || nome.length > 50
        || apelidos == undefined || apelidos.length > 50 || !email || email == '' || !contrasinal || contrasinal == '' || email.length > 70) {
        helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", undefined, res);
        return;
    }

    var hashedPssw = bcrypt.hashSync(contrasinal, 10);              // Hash do contrasinal

    const queryDuplicateUser = sql.usuarios.exists;                 // Consulta que comproba se o usuario xa existe na BBDD

    const query = sql.usuarios.new;                                 // Consulta para engadir ao usuario na BBDD
    const values = [usuario, nome, apelidos, email, hashedPssw];    // Valores da consulta

    pool.connect((err, client, done) => {                           // Conexión ca BBDD, que permite iniciar unha transacción
        /**
         * Verifica se a consulta debe parar por un erro, lanzando unha mensaxe como resposta en ese caso
         * @param {Object} err 
         * @returns 
         */
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

        client.query('BEGIN', err => {                                              // Comezo da transacción
            if (shouldAbort(err)) return;

            client.query(queryDuplicateUser, [usuario, email], (err, results) => {  // Execución da primeira query, comprobación de duplicidade
                if (shouldAbort(err)) return;

                if (results.rowCount > 0) {
                    if (email == results.rows[0].email) {
                        helpers.onErrorAuth(401, "Email xa rexistrado na plataforma", err, res);
                        return;
                    } else if (usuario == results.rows[0].usuario) {
                        helpers.onErrorAuth(401, "Nome de usuario xa existente", err, res);
                        return;
                    }
                }

                client.query(query, values, (err, results) => {                     // Execución da consulta que almacena ao usuario
                    if (shouldAbort(err)) return;

                    client.query('COMMIT', error => {                               // Realización do commit para completar a transacción
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

                            var token = jwt.sign({ id: user.id }, config.secret, {      // Creación do token de usuario
                                expiresIn: config.expiresIn
                            });

                            done();

                            helpers.onCorrectAuth(token, user, res, [], [], [], []);    // Resposta de correctitude na operación e devolvendo os datos necesarios

                        } catch (err) {
                            helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                            return;
                        }
                    })
                });
            });
        })
    });
});

// postLogin()
/**
 * Permite o inicio de sesión dun usuario
 */
router.post('/login', (req, res) => {
    const { usuario, contrasinal } = req.body;                          // Recibe as credenciais no corpo da función

    const query = sql.usuarios.get.user;                                // Query para verificar o inicio de sesión

    if (!usuario || !contrasinal || contrasinal == undefined) {         // Validación de campos
        helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", undefined, res);
        return;
    }

    const elementos_favoritos = sql.usuarios.get.elementosFav           // Query para obter os elementos turísticos favoritos do usuario
    const plan_fav = sql.usuarios.get.plansFav;                         // Query para obter as planificacións favoritas do usuario
    const opinions = sql.usuarios.get.opinions;                         // Query para obter as opinións favoritas do usuario
    const plansUsuario = sql.usuarios.get.plans;                        // Query para obter as planificacións almacenadas polo usuario
    const hospedaxe_fav = sql.usuarios.get.hospedaxeFav;                // Query para obter os elementos de hospedaxe favoritos do usuario
    const hostalaria_fav = sql.usuarios.get.hostalariaFav;              // Query para obter os elementos de hostalaría favoritos do usuario
    const ocio_fav = sql.usuarios.get.ocioFav;                          // Query para obter as actividades de ocio favoritos do usuario
    const outras_fav = sql.usuarios.get.outrasFav;                      // Query para obter as outras actividades favoritas do usuario

    pool.query(query, [usuario], (err, results) => {                    // Execución de query
        if (err) {
            helpers.onErrorAuth(500, "Erro autenticando ao usuario", err, res);
            return;
        }
        if (results.rowCount == 0) {
            helpers.onErrorAuth(404, "Usuario non atopado", undefined, res);
            return;
        }

        var user = results.rows[0];

        var passwordIsValid = bcrypt.compareSync(contrasinal, user.contrasinal);    // Validación do contrasinal do usuario, comparando os hash
        if (!passwordIsValid) {
            helpers.onErrorAuth(401, "Contrasinal incorrecto", undefined, res);
            return;
        }
        delete user.contrasinal;
        var token = jwt.sign({ id: user.id }, config.secret, {              // Firma do token do usuario
            expiresIn: config.expiresIn
        });
        pool.query(elementos_favoritos, [user.id], (err, elementos) => {    
            var elementosFavArray;

            if (err) {
                helpers.onErrorAuth(500, "Erro obtendo os elementos favoritos do usuario", err, res);
                elementosFavArray = [];
            } else {
                elementosFavArray = elementos.rows;
            }

            pool.query(plan_fav, [user.id], (err, planificacions) => {      
                var planificacionsFavArray;

                if (err) {
                    helpers.onErrorAuth(500, "Erro obtendo as planificacions favoritas do usuario", err, res);
                    planificacionsFavArray = [];
                } else {
                    planificacionsFavArray = planificacions.rows;
                }

                pool.query(opinions, [user.id], (err, opinions) => {        
                    var opinionsArray;

                    if (err) {
                        helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                        opinionsArray = [];
                    } else {
                        opinionsArray = opinions.rows;
                    }

                    pool.query(plansUsuario, [user.id], (err, plans) => {   
                        var plansArray;

                        if (err) {
                            helpers.onErrorAuth(500, "Erro obtendo os plans do usuario", err, res);
                            plansArray = [];
                        } else {
                            plansArray = plans.rows;
                        }

                        pool.query(hospedaxe_fav, [user.id], (err, hospedaxes) => { 
                            var hospedaxesArray;

                            if (err) {
                                helpers.onErrorAuth(500, "Erro obtendo as hospedaxes favoritas do usuario", err, res);
                                hospedaxesArray = [];
                            } else {
                                hospedaxesArray = hospedaxes.rows;
                                hospedaxesArray.map(element => {
                                    element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
                                });
                            }

                            pool.query(hostalaria_fav, [user.id], (err, hostalaria) => {    
                                var hostalariaArray;

                                if (err) {
                                    helpers.onErrorAuth(500, "Erro obtendo a hostalaría favorita do usuario", err, res);
                                    hostalariaArray = [];
                                } else {
                                    hostalariaArray = hostalaria.rows;
                                    hostalariaArray.map(element => {
                                        element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
                                    });
                                }

                                pool.query(ocio_fav, [user.id], (err, ocio) => {           
                                    var ocioArray;

                                    if (err) {
                                        helpers.onErrorAuth(500, "Erro obtendo as actividades de ocio favoritas do usuario", err, res);
                                        ocioArray = [];
                                    } else {
                                        ocioArray = ocio.rows;
                                        ocioArray.map(element => {
                                            element.sub_tag = tag_traductor.ocio(element.sub_tag);
                                        });
                                    }

                                    pool.query(outras_fav, [user.id], (err, outras) => {
                                        var outrasArray;

                                        if (err) {
                                            helpers.onErrorAuth(500, "Erro obtendo as actividades de ocio favoritas do usuario", err, res);
                                            outrasArray = [];
                                        } else {
                                            outrasArray = outras.rows;
                                            outrasArray.map(element => {
                                                element.sub_tag = tag_traductor.outras(element.sub_tag);
                                            });
                                        }
                                        // Resposta de correctitude na operación e devolvendo os datos necesarios
                                        helpers.onCorrectAuth(token, user, res, planificacionsFavArray, plansArray, opinionsArray, elementosFavArray, hospedaxesArray, hostalariaArray, ocioArray, outrasArray);
                                    })
                                })
                            })
                        })
                    })
                });
            });

        })
    })
})

// getMe()
/**
 * Inicio de sesión do usuario a través do token, empregando a verificación de token como middleware
 */
router.get('/me', verify.verifyToken, (req, res) => {

    const userId = req.userId;                                      // Id do usuario

    const query = sql.usuarios.get.byId;                            // Query para obter a información a partir do seu id

    const elementos_favoritos = sql.usuarios.get.elementosFav;      // Query para obter os elementos turísticos favoritos do usuario
    const plan_fav = sql.usuarios.get.plansFav;                     // Query para obter as planificacións favoritas do usuario
    const opinions = sql.usuarios.get.opinions;                     // Query para obter as opinións do usuario
    const plansUsuario = sql.usuarios.get.plans;                    // Query para obter as planificacións do usuario
    const hospedaxe_fav = sql.usuarios.get.hospedaxeFav;            // Query para obter os elementos de hospedaxe favoritos do usuario
    const hostalaria_fav = sql.usuarios.get.hostalariaFav;          // Query para obter os elementos de hostalaría favoritos do usuario
    const ocio_fav = sql.usuarios.get.ocioFav;                      // Query para obter as actividades de ocio favoritas do usuario
    const outras_fav = sql.usuarios.get.outrasFav;                  // Query para obter as outras actividades favoritas do usuario

    pool.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: 500,
                message: "Erro buscando o usuario"
            });
        }
        if (results.rowCount == 0) {
            return res.status(404).json({
                status: 404,
                message: "Usuario non atopado"
            });
        }

        var user = results.rows[0];

        pool.query(elementos_favoritos, [user.id], (err, elementos) => {
            var elementosFavArray;

            if (err) {
                helpers.onErrorAuth(500, "Erro obtendo os elementos favoritos do usuario", err, res);
                return;
            } else {
                elementosFavArray = elementos.rows;
            }

            pool.query(plan_fav, [user.id], (err, planificacions) => {
                var planificacionsFavArray;

                if (err) {
                    helpers.onErrorAuth(500, "Erro obtendo as planificacions favoritas do usuario", err, res);
                    return;
                } else {
                    planificacionsFavArray = planificacions.rows;
                }

                pool.query(opinions, [user.id], (err, opinions) => {
                    var opinionsArray;

                    if (err) {
                        helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                        return;
                    } else {
                        opinionsArray = opinions.rows;
                    }

                    pool.query(plansUsuario, [user.id, user.id], (err, plans) => {
                        var plansArray;

                        if (err) {
                            helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                            return;
                        } else {
                            plansArray = plans.rows;
                        }

                        pool.query(hospedaxe_fav, [user.id], (err, hospedaxes) => {
                            var hospedaxesArray;

                            if (err) {
                                helpers.onErrorAuth(500, "Erro obtendo as hospedaxe favoritas do usuario", err, res);
                                hospedaxesArray = [];
                            } else {
                                hospedaxesArray = hospedaxes.rows;
                                hospedaxesArray.map(element => {
                                    element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
                                });
                            }

                            pool.query(hostalaria_fav, [user.id], (err, hostalaria) => {
                                var hostalariaArray;

                                if (err) {
                                    helpers.onErrorAuth(500, "Erro obtendo a hostalaría favorita do usuario", err, res);
                                    hostalariaArray = [];
                                } else {
                                    hostalariaArray = hostalaria.rows;
                                    hostalariaArray.map(element => {
                                        element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
                                    });
                                }

                                pool.query(ocio_fav, [user.id], (err, ocio) => {
                                    var ocioArray;

                                    if (err) {
                                        helpers.onErrorAuth(500, "Erro obtendo as actividades de ocio favoritas do usuario", err, res);
                                        ocioArray = [];
                                    } else {
                                        ocioArray = ocio.rows;
                                        ocioArray.map(element => {
                                            element.sub_tag = tag_traductor.ocio(element.sub_tag);
                                        });
                                    }

                                    pool.query(outras_fav, [user.id], (err, outras) => {
                                        var outrasArray;

                                        if (err) {
                                            helpers.onErrorAuth(500, "Erro obtendo as actividades de ocio favoritas do usuario", err, res);
                                            outrasArray = [];
                                        } else {
                                            outrasArray = outras.rows;
                                            outrasArray.map(element => {
                                                element.sub_tag = tag_traductor.outras(element.sub_tag);
                                            });
                                        }

                                        // Resposta indicando a correcta realización da operación e devolvendo os datos necesarios
                                        helpers.onCorrectAuth(undefined, user, res, planificacionsFavArray, plansArray, opinionsArray, elementosFavArray, hospedaxesArray, hostalariaArray, ocioArray, outrasArray);
                                    })
                                })

                            })
                        })
                    })
                });
            });

        })
    });

});

module.exports = router;