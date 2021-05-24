const fetch = require('node-fetch');

const { Pool } = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'fresh_tour'
};
const pool = new Pool(config);

describe('MP-CN06', () => {
    const url = "http://192.168.1.72:3000/auth/register";

    test('CP-CN72', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: undefined,
            contrasinal: undefined
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
            throw new Error("Error: CP-CN72");
        }
    })

    test('CP-CN73', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            
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
            throw new Error("Error: CP-CN73");
        }
    })

    test('CP-CN74', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "",
            nome: "Usuario",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN74");
        }
    })

    test('CP-CN75', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            nome: "Usuario",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN75");
        }
    })

    test('CP-CN76', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN76");
        }
    })

    test('CP-CN77', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN77");
        }
    })

    test('CP-CN78', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN78");
        }
    })

    test('CP-CN79', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN79");
        }
    })

    test('CP-CN80', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: "",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN80");
        }
    })

    test('CP-CN81', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaracte@email.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN81");
        }
    })

    test('CP-CN82', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            usuario: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMo",
            nome: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMo",
            apelidos: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMo",
            email: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaract@email.com",
            contrasinal: "proba"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.usuarios WHERE usuario LIKE $1 AND nome LIKE $2 AND apelidos LIKE $3 AND email LIKE $4', ['MoitosCaracteresMoitosCaracteresMoitosCaracteresMo', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresMo', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresMo', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaract@email.com'], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN82");
        }
    });

    test('CP-CN83', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            usuario: "M",
            nome: "N",
            apelidos: "A",
            email: "E",
            contrasinal: "proba"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.usuarios WHERE usuario LIKE $1 AND nome LIKE $2 AND apelidos LIKE $3 AND email LIKE $4', ['M', 'N', 'A', 'E'], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN83");
        }
    });
});

describe('MP-CN07', () => {
    const url = "http://192.168.1.72:3000/auth/login";

    test('CP-CN84', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            contrasinal: undefined
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
            throw new Error("Error: CP-CN84");
        }
    })

    test('CP-CN85', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
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
            throw new Error("Error: CP-CN85");
        }
    })

    test('CP-CN86', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            usuario: "M",
            contrasinal: "proba"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).toBe(200);
            done();
        } catch (err) {
            throw new Error("Error: CP-CN86");
        }
    });
});

describe('MP-CN08', () => {
    const url = "http://192.168.1.72:3000/usuario/edit";

    test('CP-CN87', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: undefined,
            contrasinal: undefined
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
            throw new Error("Error: CP-CN87");
        }
    })

    test('CP-CN88', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            
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
            throw new Error("Error: CP-CN88");
        }
    })

    test('CP-CN89', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "",
            nome: "Usuario",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN89");
        }
    })

    test('CP-CN90', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            nome: "Usuario",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN90");
        }
    })

    test('CP-CN91', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN91");
        }
    })

    test('CP-CN92', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            apelidos: "Proba",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN92");
        }
    })

    test('CP-CN93', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN93");
        }
    })

    test('CP-CN94', async () => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoi",
            email: "proba@proba.com",
            contrasinal: "proba"
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
            throw new Error("Error: CP-CN94");
        }
    })

    test('CP-CN95', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: "",
            contrasinal: "proba"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
            done();
        } catch (err) {
            throw new Error("Error: CP-CN95");
        }
    })

    test('CP-CN96', async (done) => {
        expect.assertions(1);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const body = {
            usuario: "usuario_proba",
            nome: "Usuario",
            apelidos: "Proba",
            email: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaracte@email.com",
            contrasinal: "proba"
        }
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            const json = await response.json();
            expect(json.status).not.toBe(200);
            done();
        } catch (err) {
            throw new Error("Error: CP-CN96");
        }
    })

    test('CP-CN97', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            usuario: "MoitosCaracteresMoitosCaracteresMoitosCaracteresEd",
            nome: "MoitosCaracteresMoitosCaracteresMoitosCaracteresEd",
            apelidos: "MoitosCaracteresMoitosCaracteresMoitosCaracteresEd",
            email: "MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaraEd@email.com",
            contrasinal: "proba"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.usuarios WHERE usuario LIKE $1 AND nome LIKE $2 AND apelidos LIKE $3 AND email LIKE $4', ['MoitosCaracteresMoitosCaracteresMoitosCaracteresEd', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresEd', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresEd', 'MoitosCaracteresMoitosCaracteresMoitosCaracteresMoitosCaraEd@email.com'], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN97");
        }
    });

    test('CP-CN98', async (done) => {
        expect.assertions(1);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTYyMTc4NDA2OSwiZXhwIjoxNjIxODcwNDY5fQ.qjEiHFTfk4ix0ZSf7vTnyLKu39k8hm1tDJA7Kmsnz-E'
        }
        const body = {
            usuario: "E",
            nome: "D",
            apelidos: "I",
            email: "T",
            contrasinal: "proba"
        }
        try {
            await fetch(url, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)
            });

            await pool.query('SELECT * FROM fresh_tour.usuarios WHERE usuario LIKE $1 AND nome LIKE $2 AND apelidos LIKE $3 AND email LIKE $4', ['E', 'D', 'I', 'T'], (err, res) => {
                if(err) {
                    throw new Error("Error");
                }
                expect(res.rowCount).toBe(1);
                done();
            });
        } catch (err) {
            throw new Error("Error: CP-CN98");
        }
    });
});

afterAll(async done => {
    await pool.end();
    done();
});