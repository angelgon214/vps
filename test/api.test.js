const request = require('supertest');
const app = require('../src/index');

describe('API Integration Tests', () => {

    describe('GET /', () => {
        it('debería retornar la página HTML', async () => {
            const response = await request(app).get('/');

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('text/html');
        });
    });

    describe('GET /api/users', () => {
        it('debería retornar lista de usuarios', async () => {
            const response = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('POST /api/users', () => {
        it('debería crear un nuevo usuario', async () => {
            const newUser = {
                name: 'Test User',
                email: 'test@example.com'
            };

            const response = await request(app)
                .post('/api/users')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.name).toBe(newUser.name);
            expect(response.body.data.email).toBe(newUser.email);
        });

        it('debería retornar error 400 si faltan campos', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({ name: 'Solo nombre' });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
        });
    });

    describe('GET /api/users/:id', () => {
        it('debería retornar un usuario específico', async () => {
            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toHaveProperty('id', 1);
        });

        it('debería retornar 404 si el usuario no existe', async () => {
            const response = await request(app).get('/api/users/9999');

            expect(response.status).toBe(404);
            expect(response.body.status).toBe('error');
        });
    });
});
