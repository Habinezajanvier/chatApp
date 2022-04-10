import request from 'supertest';
import app from '../../src/app';

describe('Welcome page', () => {
  it('Should return Welcome message for /api', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('Shoud return 404 for any not existing route', async () => {
    const res = await request(app).get('/notFound');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
