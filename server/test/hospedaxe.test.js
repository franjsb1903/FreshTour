const fetch = require('node-fetch');

const { Pool } = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};
const pool = new Pool(config);

/*describe('MP-CN21', () => {
    const url = "http://192.168.1.72:3000/hospedaxe/fav";
    test('CP-CN134', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hospedaxe: -1
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
            throw new Error("Error: CP-CN134");
        }
    })

    test('CP-CN135', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hospedaxe: undefined
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
            throw new Error("Error: CP-CN135");
        }
    })

    test('CP-CN136', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hospedaxe: 79
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_hospedaxe_favoritos WHERE id_lugar_hospedaxe = $1', [79], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN136");
        }
    });
});*/

describe('MP-CN22', () => {
    const url = "http://192.168.1.72:3000/hospedaxe/fav";
    test('CP-CN137', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hospedaxe: undefined
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
            throw new Error("Error: CP-CN137");
        }
    })

    test('CP-CN138', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hospedaxe: 403
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_hospedaxe_favoritos WHERE id_lugar_hospedaxe = $1', [403], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN138");
        }
    });
});

afterAll(async done => {
    await pool.end();
    done();
});