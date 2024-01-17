const  request  = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzuig');

describe('test for /users path', () => {

  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('GET /users/{id}', () => {
    test('should return a user ', async () => {
      const user = await models.User.findByPk('1')
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toEqual(user.email);
    });
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

    test('should return a new user', async () => {
      // Arrange
      const inputData = {
        email: "chalaDeChoclo@gmail.com",
        password: "elChala123"
      };
      // Atc
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(201);
      // check DB
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual('admin');
      expect(user.email).toEqual(inputData.email);
    });
  });

  describe('PUT /users', () => {

  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
