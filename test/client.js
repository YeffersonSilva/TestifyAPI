import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js';

describe('Client API', () => {
  describe('GET /clients', () => {
    it('should respond with json containing a list of all clients', async () => {
      const res = await request(app)
        .get('/clients')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal([
        { id: 'C0001', name: 'Client 1', email: 'client1@example.com' },
        { id: 'C0002', name: 'Client 2', email: 'client2@example.com' }
      ]);
    });
  });

  describe('GET /clients/:id', () => {
    it('should respond with json containing a single client', async () => {
      const res = await request(app)
        .get('/clients/C0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ id: 'C0001', name: 'Client 1', email: 'client1@example.com' });
    });

    it('should respond with json client not found when the client does not exist', async () => {
      const res = await request(app)
        .get('/clients/nonexistingclient')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Client not found' });
    });
  });

  describe('POST /clients', () => {
    it('should respond with 201 created', async () => {
      const data = {
        name: 'Client 3',
        email: 'client3@example.com'
      };
      const res = await request(app)
        .post('/clients')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).to.deep.equal({ message: 'Client created' });
    });

    it('should respond with 400 on bad request', async () => {
      const data = {};
      const res = await request(app)
        .post('/clients')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'Client not created' });
    });
  });

  describe('PUT /clients/:id', () => {
    it('should respond with 200 client updated', async () => {
      const data = { name: 'Updated Client 1', email: 'updatedclient1@example.com' };
      const res = await request(app)
        .put('/clients/C0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'Client updated' });
    });

    it('should respond with 400 on invalid data', async () => {
      const data = {};
      const res = await request(app)
        .put('/clients/C0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'Invalid data' });
    });

    it('should respond with 404 client not found', async () => {
      const data = { name: 'Updated Client', email: 'updatedclient@example.com' };
      const res = await request(app)
        .put('/clients/nonexistingclient')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Client not found' });
    });
  });

  describe('DELETE /clients/:id', () => {
    it('should respond with 200 client deleted', async () => {
      const res = await request(app)
        .delete('/clients/C0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'Client deleted' });
    });

    it('should respond with 404 client not found', async () => {
      const res = await request(app)
        .delete('/clients/nonexistingclient')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Client not found' });
    });
  });
});
