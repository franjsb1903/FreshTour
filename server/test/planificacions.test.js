const fetch = require('node-fetch');

const { Pool } = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};

const pool = new Pool(config);

/*describe('MP-CN09', () => {
    const url = "http://192.168.1.72:3000/planificacions/share";

    test('CP-CN99', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTYyMTg1MzQ0MCwiZXhwIjoxNjIxOTM5ODQwfQ.Rha3QtRgQIBy5Q224YDgt-9arJW0z5gDVCxlZEdNdNs'
        }
        const body = {
            id: undefined,
            isShare: false
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
            throw new Error("Error: CP-CN99");
        }
    });

    test('CP-CN100', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTYyMTg1MzQ0MCwiZXhwIjoxNjIxOTM5ODQwfQ.Rha3QtRgQIBy5Q224YDgt-9arJW0z5gDVCxlZEdNdNs'
        }
        const body = {
            id: 55,
            isShare: undefined
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
            throw new Error("Error: CP-CN100");
        }
    });

    test('CP-CN101', async (done) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTYyMTg1MzQ0MCwiZXhwIjoxNjIxOTM5ODQwfQ.Rha3QtRgQIBy5Q224YDgt-9arJW0z5gDVCxlZEdNdNs'
        }
        const body = {
            id: 55,
            isShare: false
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.planificacions WHERE id = $1 AND esta_compartida = $2', [106, false], (err, res) => {
                if(err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN101");
        }
    });
});*/

/*
describe('MP-CN10', () => {
    const url = "http://192.168.1.72:3000/planificacions/elements/";

    test('CP-CN102', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        try {
            const response = await fetch(url + undefined, {
                method: 'get',
                headers: headers
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
        } catch (err) {
            throw new Error("Error: CP-CN102");
        }
    });

    test('CP-CN103', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        try {
            const response = await fetch(url + 55, {
                method: 'get',
                headers: headers
            });
            const json = await response.json();

            await pool.query('select * from fresh_tour.planificacions_lugares_turisticos plt where plt.id_planificacion = $1 union all select * from fresh_tour.planificacions_monumentos pm where pm.id_planificacion = $1', [55], (err, res) => {
                if(err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(json.elementos.length);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN103");
        }
    });
});*/
/*
describe('MP-CN11', () => {
    const url = "http://192.168.1.72:3000/planificacions/";

    test('CP-CN104', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
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
            throw new Error("Error: CP-CN104");
        }
    });

    test('CP-CN105', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
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
            throw new Error("Error: CP-CN105");
        }
    });

    test('CP-CN106', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 106
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });
            await pool.query('select * from fresh_tour.planificacions WHERE id = $1', [106], (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN106");
        }
    });
});*/
/*
describe('MP-CN12', () => {
    const url = "http://192.168.1.72:3000/planificacions/edit";

    test('CP-CN107', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: undefined,
            titulo: "Modificada",
            comentario: "Modificada"
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
            throw new Error("Error: CP-CN107");
        }
    });

    test('CP-CN108', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94,
            titulo: undefined,
            comentario: "Modificada"
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
            throw new Error("Error: CP-CN108");
        }
    });

    test('CP-CN109', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94
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
            throw new Error("Error: CP-CN109");
        }
    });

    test('CP-CN110', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94,
            titulo: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            comentario: "Modificada"
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
            throw new Error("Error: CP-CN110");
        }
    });

    test('CP-CN111', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94,
            titulo: "",
            comentario: "Modificada"
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
            throw new Error("Error: CP-CN111");
        }
    });

    test('CP-CN112', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94,
            titulo: "MoitosCaracteresMoitosCaracteresMoitosCaracteresEd",
            comentario: "Modificada"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('select * from fresh_tour.planificacions WHERE id = $1 AND titulo LIKE $2 AND comentario LIKE $3', [94, "MoitosCaracteresMoitosCaracteresMoitosCaracteresEd", "Modificada"], (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN112");
        }
    });

    test('CP-CN113', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id: 94,
            titulo: "E",
            comentario: "Modificada"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('select * from fresh_tour.planificacions WHERE id = $1 AND titulo LIKE $2 AND comentario LIKE $3', [94, "E", "Modificada"], (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN113");
        }
    });
});*/
/*
describe('MP-CN13', () => {
    const url = "http://192.168.1.72:3000/planificacions/fav";
    test('CP-CN114', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id_elemento: -1
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
            throw new Error("Error: CP-CN114");
        }
    })

    test('CP-CN115', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id_elemento: undefined
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
            throw new Error("Error: CP-CN115");
        }
    })

    test('CP-CN116', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id_elemento: 94
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('select * from fresh_tour.planificacions_favoritas WHERE id_planificacion = $1 AND id_usuario = $2', [94, 38], (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN116");
        }
    });
})*/

describe('MP-CN14', () => {
    const url = "http://192.168.1.72:3000/planificacions/fav";

    test('CP-CN117', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id_elemento: undefined
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
            throw new Error("Error: CP-CN117");
        }
    })

    test('CP-CN118', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTg1NzA1MywiZXhwIjoxNjIxOTQzNDUzfQ.v3vLSTL62wncGJnJNt0Wb4VLZ07UFWDx8VolcLT_xe8'
        }
        const body = {
            id_elemento: 94
        }
        try {
            await fetch(url, {
                method: 'delete',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('select * from fresh_tour.planificacions_favoritas WHERE id_planificacion = $1 AND id_usuario = $2', [94, 38], (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                expect(res.rowCount).toBe(0);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN118");
        }
    });
})

afterAll(async done => {
    await pool.end();
    done();
});