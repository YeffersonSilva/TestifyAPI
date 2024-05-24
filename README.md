# TestifyAPI

## Introduction
TestifyAPI is a simple RESTful API designed to manage users, products, and clients. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on these entities. Comprehensive tests are included to ensure the reliability and correctness of the API, covering all CRUD operations for users, products, and clients. The tests are written using Mocha, Chai, and Supertest, making it easy to verify that the API behaves as expected.

## Installation
To install and set up TestifyAPI, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YeffersonSilva/TestifyAPI.git
2. Navigate to the project directory:
  ```sh
cd TestifyAPI

   ```
3. Install dependencies:
 ```sh
  npm install
```
4. Usage
To start using TestifyAPI, run the following command to start the server:
 ```sh
npm start
 ```
The API will be available at http://localhost:3000.

## API Endpoints
- Users: /users
- Products: /products
- Clients

##  Running Tests
To run the tests, use:
 ```sh
  npm test
 ```
Test Examples

 ```
describe('GET /users', () => {
  it('should respond with a list of all users', async () => {
    const res = await request(app).get('/users').expect(200);
    expect(res.body).to.be.an('array');
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'newuser', password: 'password' })
      .expect(201);
    expect(res.body).to.have.property('message', 'User created');
  });
});
```
