const  request  = require('supertest');
const createApp = require('../src/app');



describe('test for /users path', () => {

  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe('GET /users', () => {

  });

  describe('POST /users', () => {

    test('should return a 400 Bad request with password invalid', async () => {
      // Arrange
      const inputData = {
        email: "lauti@mail.com",
        password: "---"
      };
      // Atc
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);

    });

    test('should return a 400 Bad request with email invalid', async () => {
      // Arrange
      const inputData = {
        email: "------",
        password: "qwertyuk87654321"
      };
      // Atc
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);

    });
  });

  describe('PUT /users', () => {

  });

  afterEach(() => {
    server.close();
  });
});
