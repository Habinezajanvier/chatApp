import request from 'supertest';
import db, { url } from '../../src/database';
import app from '../../src/app';

describe('Authentication', () => {
  const { User } = db;
  const user = {
    email: 'test@email.com',
    fullName: 'Test Name',
    password: 'simplePass',
  };
  describe('Signup', () => {
    it('Should return 201 if user created successfully', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).not.toHaveProperty('password');
      expect(res.body.data).toHaveProperty(
        'email',
        user.email
      );
      //   done();
    });
    it('Should return 409 if account exist', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Login', () => {
    it('Should return 200 for successful login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
          password: user.password,
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('message');
    });
    it('Should return 403 if account does not exist', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'dummy@test.com',
          password: user.password,
        });
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
    });
    it('Should return 403 if password is incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
          password: 'incorrect',
        });
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
    });
  });
});
