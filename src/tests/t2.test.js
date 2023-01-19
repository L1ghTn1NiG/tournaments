const app = require('../app');
const request = require('supertest');
const jest = require('@jest/globals');

function makeid(length) {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}
jest.describe('Пользовательский тест', () => {
    jest.describe('Регистрация', () => {
        jest.test('Ожидается статус 200', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: makeid(10),
                    email: makeid(10) + '@mail.ru',
                    password: makeid(10),
                    profile: {
                        first_name: 'name',
                        age: 20,
                        gender: 'male',
                        lifestyle: 'moderate',
                        weight: 60.1,
                        height: 175.5,
                        desired_weight: 50.0,
                    },
                });
            jest.expect(response.statusCode).toBe(200);
        });
    });
});
