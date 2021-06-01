const fetch = require('node-fetch');

const { Pool } = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};
const pool = new Pool(config);

/*describe('MP-CN15', () => {
    const url = "http://192.168.1.72:3000/lecer/hostalaria/fav";
    test('CP-CN119', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hostalaria: -1
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
            throw new Error("Error: CP-CN119");
        }
    })

    test('CP-CN120', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hostalaria: undefined
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
            throw new Error("Error: CP-CN120");
        }
    })

    test('CP-CN121', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hostalaria: 403
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_hostalaria_favoritos WHERE id_lugar_hostalaria = $1', [403], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN121");
        }
    });
});

describe('MP-CN16', () => {
    const url = "http://192.168.1.72:3000/lecer/hostalaria/fav";
    test('CP-CN122', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hostalaria: undefined
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
            throw new Error("Error: CP-CN122");
        }
    })

    test('CP-CN123', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_lugar_hostalaria: 403
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.lugares_hostalaria_favoritos WHERE id_lugar_hostalaria = $1', [403], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN123");
        }
    });
});*/
/*
describe('MP-CN17', () => {
    const url = "http://192.168.1.72:3000/lecer/ocio/fav";
    test('CP-CN124', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_actividade_ocio: -1
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
            throw new Error("Error: CP-CN124");
        }
    })

    test('CP-CN125', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_actividade_ocio: undefined
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
            throw new Error("Error: CP-CN125");
        }
    })

    test('CP-CN126', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_actividade_ocio: 34
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.actividades_ocio_favoritas WHERE id_actividade_ocio = $1', [34], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN126");
        }
    });
});

describe('MP-CN18', () => {
    const url = "http://192.168.1.72:3000/lecer/ocio/fav";
    test('CP-CN127', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_actividade_ocio: undefined
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
            throw new Error("Error: CP-CN127");
        }
    })

    test('CP-CN128', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_actividade_ocio: 34
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.actividades_ocio_favoritas WHERE id_actividade_ocio = $1', [34], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN128");
        }
    });
});*/

/*describe('MP-CN19', () => {
    const url = "http://192.168.1.72:3000/lecer/outras/fav";
    test('CP-CN129', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_outra_actividade: -1
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
            throw new Error("Error: CP-CN129");
        }
    })

    test('CP-CN130', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_outra_actividade: undefined
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
            throw new Error("Error: CP-CN125");
        }
    })

    test('CP-CN131', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_outra_actividade: 1942
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.outras_actividades_favoritas WHERE id_outra_actividade = $1', [1942], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN131");
        }
    });
});*/

describe('MP-CN20', () => {
    const url = "http://192.168.1.72:3000/lecer/outras/fav";
    test('CP-CN132', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_outra_actividade: undefined
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
            throw new Error("Error: CP-CN127");
        }
    })

    test('CP-CN133', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMjU3OTUxOSwiZXhwIjoxNjIyNjY1OTE5fQ.U0BvWwUP5r3rpb8LpewLOOwPMaWyQWK68Egiyo2sDzo'
        }
        const body = {
            id_outra_actividade: 1942
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.outras_actividades_favoritas WHERE id_outra_actividade = $1', [1942], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN128");
        }
    });
});

afterAll(async done => {
    await pool.end();
    done();
});