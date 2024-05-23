const request = require('supertest');

const app = require('../src/server');

// Test the GET route user endpoint

it('respond with json containing a list of all users', done => {
    request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
});