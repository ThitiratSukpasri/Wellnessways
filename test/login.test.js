const request = require('supertest');
const app = require('../index');

let server;

beforeAll((done) => {
  // Start the server on port 4000 instead of 3000
  server = app.listen(4000, done);
}, 10000); // Increase the timeout to 10 seconds

afterAll((done) => {
  server.close(done);
});

describe('POST /index', () => {
  it('should return status 200 and message "Login successful" for valid credentials', async () => {
    const response = await request(app)
      .post('/index')
      .send({ email: 'thitirat.min@hotmail.com', password: 'test' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should return status 401 and message "Invalid email or password" for invalid credentials', async () => {
    const response = await request(app)
      .post('/index')
      .send({ email: 'invalid@example.com', password: 'invalidpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
