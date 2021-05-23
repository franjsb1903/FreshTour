const fetch = require('node-fetch');

const { Pool } = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};

const pool = new Pool(config);

describe('MP-CN01', () => {
    const url = "http://192.168.1.72:3000/opinions/new";
    test('CP-CN01', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'nonvalido'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 43,
            type: "Monumento"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN01");
        }
    });

    test('CP-CN02', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: undefined,
            titulo: "Proba",
            comentario: undefined,
            id_elemento: 43,
            type: "Monumento"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN02");
        }
    });

    test('CP-CN03', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 43,
            type: "Monumento"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN03");
        }

    });

    test('CP-CN04', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 11,
            type: "Casa"
        }

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN04");
        }

    });

    test('CP-CN05', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 11,
            type: undefined
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN05");
        }

    });

    test('CP-CN06', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba de titulo con 51 caracteres, escribindo at c",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN06");
        }

    });

    test('CP-CN07', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "",
            comentario: "Proba",
            id_elemento: 6,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN07");
        }

    });

    test('CP-CN08', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: -1,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 7,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN08");
        }

    });

    test('CP-CN09', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 6,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 8,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN09");
        }

    });

    test('CP-CN10', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: -1,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN10");
        }

    });

    test('CP-CN11', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: undefined,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN11");
        }

    });

    test('CP-CN12', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba con moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moito c",
            id_elemento: 9,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN12");
        }

    });

    test('CP-CN13', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "",
            id_elemento: 10,
            type: "Lugar turístico"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN13");
        }

    });

    test('CP-CN14', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 11,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 11], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN14");
        }
    });

    test('CP-CN15', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 13,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 13], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN15");
        }

    });

    test('CP-CN16', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 5,
            type: "Monumento"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN16");
        }

    });

    test('CP-CN17', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 6,
            type: "Monumento"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 6], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN17");
        }

    });

    test('CP-CN18', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 106,
            type: "Planificación"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 106], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN18");
        }

    });

    test('CP-CN19', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comenta",
            id_elemento: 92,
            type: "Planificación"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });


            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 92], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN19");
        }

    });

    test('CP-CN20', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "P",
            comentario: "P",
            id_elemento: 14,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2', ['P', 14], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN20");
        }

    });

    test('CP-CN21', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "P",
            comentario: "P",
            id_elemento: 15,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2', ['P', 15], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN21");
        }

    });

    test('CP-CN22', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "P",
            comentario: "P",
            id_elemento: 7,
            type: "Monumento"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2', ['P', 7], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN22");
        }

    });

    test('CP-CN23', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "P",
            comentario: "P",
            id_elemento: 8,
            type: "Monumento"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2', ['P', 8], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN23");
        }

    });

    test('CP-CN24', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "P",
            comentario: "P",
            id_elemento: 53,
            type: "Planificación"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2', ['P', 53], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN24");
        }

    });

    test('CP-CN25', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "P",
            comentario: "P",
            id_elemento: 55,
            type: "Planificación"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2', ['P', 55], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });

        } catch (err) {
            throw new Error("Error: CP-CN25");
        }

    });
})

describe('MP-CN02', () => {
    const url = "http://192.168.1.72:3000/opinions/edit";

    test('CP-CN26', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: undefined,
            titulo: "Proba",
            comentario: undefined,
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN26");
        }
    });

    test('CP-CN27', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN27");
        }
    });

    test('CP-CN28', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: "Casa",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN28");
        }
    });

    test('CP-CN29', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: undefined,
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN29");
        }
    });

    test('CP-CN30', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba de titulo con 51 caracteres, escribindo at c",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN30");
        }
    });

    test('CP-CN31', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN31");
        }
    });

    test('CP-CN32', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: -1,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN32");
        }
    });

    test('CP-CN33', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 6,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN33");
        }
    });

    test('CP-CN34', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: -1,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN34");
        }
    });

    test('CP-CN35', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: undefined,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN35");
        }
    });

    test('CP-CN36', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba con moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moitos caracteres moito c",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN36");
        }
    });

    test('CP-CN37', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN37");
        }
    });

    test('CP-CN38', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: -1
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN38");
        }
    });

    test('CP-CN39', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Proba",
            comentario: "Proba",
            id_elemento: 5,
            type: "Lugar turístico",
            id: undefined
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN39");
        }
    });

    test('CP-CN40', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2 AND valoracion = $3', 
            ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 5, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
            
        } catch (err) {
            throw new Error("Error: CP-CN40");
        }
    });

    test('CP-CN41', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 5,
            type: "Monumento",
            id: 6
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2 AND valoracion = $3', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 5, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN41");
        }
    });

    test('CP-CN42', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 106,
            type: "Planificación",
            id: 17
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2 AND valoracion = $3', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 106, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN42");
        }
    });

    test('CP-CN43', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2 AND valoracion = $3', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 5, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN43");
        }
    });

    test('CP-CN44', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 5,
            type: "Monumento",
            id: 6
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2 AND valoracion = $3', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 5, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN44");
        }
    });

    test('CP-CN45', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion",
            comentario: "Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de comentario longo Proba de edicion",
            id_elemento: 106,
            type: "Planificación",
            id: 17
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2 AND valoracion = $3', ['Probaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaedicion', 106, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN45");
        }
    });

    test('CP-CN46', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "T",
            comentario: "T",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2 AND valoracion = $3', ['T', 5, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN46");
        }
    });

    test('CP-CN47', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "T",
            comentario: "T",
            id_elemento: 5,
            type: "Monumento",
            id: 6
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2 AND valoracion = $3', ['T', 5, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN47");
        }
    });

    test('CP-CN48', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 0,
            titulo: "T",
            comentario: "T",
            id_elemento: 106,
            type: "Planificación",
            id: 17
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2 AND valoracion = $3', ['T', 106, 0], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN48");
        }
    });

    test('CP-CN49', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "T",
            comentario: "T",
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE titulo LIKE $1 AND id_lugar_turistico = $2 AND valoracion = $3', ['T', 5, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN49");
        }
    });

    test('CP-CN50', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "T",
            comentario: "T",
            id_elemento: 5,
            type: "Monumento",
            id: 6
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE titulo LIKE $1 AND id_monumento = $2 AND valoracion = $3', ['T', 5, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN50");
        }
    });

    test('CP-CN51', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            valoracion: 5,
            titulo: "T",
            comentario: "T",
            id_elemento: 106,
            type: "Planificación",
            id: 17
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE titulo LIKE $1 AND id_planificacion = $2 AND valoracion = $3', ['T', 106, 5], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN51");
        }
    });
})

describe('MP-CN03', () => {
    const url = "http://192.168.1.72:3000/opinions/";
    test('CP-CN52', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 15,
            type: "Casa",
            id: 52
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN52");
        }
    });

    test('CP-CN53', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 15,
            type: undefined,
            id: 52
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN53");
        }
    });

    test('CP-CN54', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: -1,
            type: "Lugar turístico",
            id: 52
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN54");
        }
    });

    test('CP-CN55', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: undefined,
            type: "Lugar turístico",
            id: 52
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN55");
        }
    });

    test('CP-CN56', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 15,
            type: "Lugar turístico",
            id: -1
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN56");
        }
    });

    test('CP-CN57', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 15,
            type: "Lugar turístico",
            id: undefined
        }
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN57");
        }
    });

    test('CP-CN58', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 5,
            type: "Lugar turístico",
            id: 66
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id = $1', [66], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN58");
        }
    });

    test('CP-CN59', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 5,
            type: "Monumento",
            id: 6
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE id = $1', [6], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN59");
        }
    });

    test('CP-CN60', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 106,
            type: "Planificación",
            id: 17
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE id = $1', [17], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN60");
        }
    });
});

afterAll(async done => {
    await pool.end();
    done();
});