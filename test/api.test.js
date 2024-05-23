const request = require('supertest');
const app = require('../src/server');

describe('GET /users', () => {
    it('respond with json containing a list of all users', done => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
