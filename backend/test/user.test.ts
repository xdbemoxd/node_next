//describe('API de USER')
//it('Debe devolver todos las consultas con el nombre del usuario y su contraseña')
//const result = request(app).get('/api/user/:user/:password')
//expect(res.statusCode).toBe(200)

import request from 'supertest';
import app from '../src/app';
import { describe, it, expect } from '@jest/globals';

describe( 'API de User', () => {
    it( 'Debe devolver conexion user lista', async () => {
        const res = await request(app).get('/api/user');
        expect(res.statusCode).toBe(200);
    });

    it( 'Debe devolver un usuario y contaseña', async () => {
        const res = await request(app).get('/api/user/root/root');
        expect(res.statusCode).toBe(200);
    });

    it ( 'Debe devolver un error', async () => {
        const res = await request(app).get('/api/user/ / ');
        expect(res.statusCode).toBe(404);
    });
});

