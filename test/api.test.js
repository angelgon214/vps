const request = require('supertest');
const app = require('../src/index');

describe('API Integration Tests', () => {

    // Test 1: Verificar que la ruta raíz funciona
    describe('GET /', () => {
        it('debería retornar mensaje de bienvenida', async () => {
            const response = await request(app).get('/');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.status).toBe('success');
        });
    });

    // Test 2: Obtener todos los usuarios
    describe('GET /api/users', () => {
        it('debería retornar lista de usuarios', async () => {
            const response = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    // Test 3: Crear un nuevo usuario
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

    // Test 4: Obtener usuario por ID
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
