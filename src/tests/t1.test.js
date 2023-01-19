const app = require('../app');
const request = require('supertest');
const jest = require('@jest/globals');
jest.describe('Пользовательский тест', () => {
    jest.describe('Проверка соединения', () => {
        jest.test('Ожидается статус 200', async () => {
            const response = await request(app).post('/ping');
            jest.expect(response.statusCode).toBe(200);
        });
    });
});
