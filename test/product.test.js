import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js';

describe('Product API', () => {
  describe('GET /products', () => {
    it('should respond with json containing a list of all products', async () => {
      const res = await request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal([
        { id: 'P0001', name: 'Product 1', price: 100 },
        { id: 'P0002', name: 'Product 2', price: 200 }
      ]);
    });
  });

  describe('GET /products/:id', () => {
    it('should respond with json containing a single product', async () => {
      const res = await request(app)
        .get('/products/P0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ id: 'P0001', name: 'Product 1', price: 100 });
    });

    it('should respond with json product not found when the product does not exist', async () => {
      const res = await request(app)
        .get('/products/nonexistingproduct')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Product not found' });
    });
  });

  describe('POST /products', () => {
    it('should respond with 201 created', async () => {
      const data = {
        name: 'Product 3',
        price: 300
      };
      const res = await request(app)
        .post('/products')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).to.deep.equal({ message: 'Product created' });
    });

    it('should respond with 400 on bad request', async () => {
      const data = {};
      const res = await request(app)
        .post('/products')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'Product not created' });
    });
  });

  describe('PUT /products/:id', () => {
    it('should respond with 200 product updated', async () => {
      const data = { name: 'Updated Product 1', price: 150 };
      const res = await request(app)
        .put('/products/P0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'Product updated' });
    });

    it('should respond with 400 on invalid data', async () => {
      const data = {};
      const res = await request(app)
        .put('/products/P0001')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).to.deep.equal({ message: 'Invalid data' });
    });

    it('should respond with 404 product not found', async () => {
      const data = { name: 'Updated Product', price: 150 };
      const res = await request(app)
        .put('/products/nonexistingproduct')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Product not found' });
    });
  });

  describe('DELETE /products/:id', () => {
    it('should respond with 200 product deleted', async () => {
      const res = await request(app)
        .delete('/products/P0001')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.deep.equal({ message: 'Product deleted' });
    });

    it('should respond with 404 product not found', async () => {
      const res = await request(app)
        .delete('/products/nonexistingproduct')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).to.deep.equal({ message: 'Product not found' });
    });
  });
});
