const  request  = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/seed');


describe('test for /auth path', () => {

  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('POST /login', () => {
    test('should return a 401', async () => {
      // Arrange
      const inputData = {
        email: "damamama@gmail.com",
        password: "qwertyuk87654321"
      };
      // Atc
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(401);
    });

    test('should return a 200', async () => {
      // Arrange
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: "admin123"
      };
      // Atc
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(inputData.email);
      expect(body.user.password).toBeUndefined();
    });
  });



  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
