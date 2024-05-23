import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js';

describe('User API', () => {
  describe('GET /users', () => {
    it('should respond with json containing a list of all users', async () => {
      const res = await request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal([
        { id: 'U0001', name: 'John Doe' },
        { id: 'U0002', name: 'Jane Doe' }
      ]);
    });
  });

  describe('GET /users/:id', () => {
    it('should respond with json containing a single user', async () => {
      const res = await request(app)
        .get('/users/U0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ id: 'U0001', name: 'John Doe' });
    });

    it('should respond with json user not found when the user does not exist', async () => {
      const res = await request(app)
        .get('/users/nonexistinguser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe('POST /users', () => {
    it('should respond with 201 created', async () => {
      const data = {
        username: 'fazt',
        password: 'password123'
      };
      const res = await request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).to.deep.equal({ message: 'User created' });
    });

    it('should respond with 400 on bad request', async () => {
      const data = {};
      const res = await request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'User not created' });
    });
  });

  describe('PUT /users/:id', () => {
    it('should respond with 200 user updated', async () => {
      const data = { name: 'John Smith' };
      const res = await request(app)
        .put('/users/U0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'User updated' });
    });

    it('should respond with 400 on invalid data', async () => {
      const data = {};
      const res = await request(app)
        .put('/users/U0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'Invalid data' });
    });

    it('should respond with 404 user not found', async () => {
      const data = { name: 'John Smith' };
      const res = await request(app)
        .put('/users/nonexistinguser')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should respond with 200 user deleted', async () => {
      const res = await request(app)
        .delete('/users/U0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'User deleted' });
    });

    it('should respond with 404 user not found', async () => {
      const res = await request(app)
        .delete('/users/nonexistinguser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });
});
