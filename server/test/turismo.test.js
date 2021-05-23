const fetch = require('node-fetch');

const { Pool } = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};
const pool = new Pool(config);

describe('MP-CN04', () => {
    const url = "http://192.168.1.72:3000/turismo/fav";
    test('CP-CN61', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
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
            throw new Error("Error: CP-CN61");
        }
    })

    test('CP-CN62', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
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
            throw new Error("Error: CP-CN62");
        }
    })

    test('CP-CN63', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
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
            throw new Error("Error: CP-CN63");
        }
    })

    test('CP-CN64', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
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
            throw new Error("Error: CP-CN64");
        }
    })

    test('CP-CN65', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 11,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_turisticos_favoritos WHERE id_lugar_turistico = $1', [11], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN65");
        }
    });

    test('CP-CN66', async (done) => {
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
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.monumentos_favoritos WHERE id_monumento = $1', [43], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN66");
        }
    });
});

describe('MP-CN05', () => {
    const url = "http://192.168.1.72:3000/turismo/fav";

    test('CP-CN67', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: undefined,
            type: "Lugar turístico"
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
            throw new Error("Error: CP-CN62");
        }
    })

    test('CP-CN68', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 11,
            type: "Casa"
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
            throw new Error("Error: CP-CN63");
        }
    })

    test('CP-CN69', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 11,
            type: undefined
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
            throw new Error("Error: CP-CN64");
        }
    })

    test('CP-CN70', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            id_elemento: 11,
            type: "Lugar turístico"
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_turisticos_favoritos WHERE id_lugar_turistico = $1', [11], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN65");
        }
    });

    test('CP-CN71', async (done) => {
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
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.monumentos_favoritos WHERE id_monumento = $1', [43], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN66");
        }
    });
});

afterAll(async done => {
    await pool.end();
    done();
});