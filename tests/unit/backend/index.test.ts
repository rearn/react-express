import supertest from 'supertest';
import app from '@/main';
const request = supertest;

test('2005', async () => {
  const response = await request(app).get('/api2005');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject([
    { L: 10, H: 1 },
    { L: 10, H: 0 },
    { H: 1, L: 10 },
    { H: 2, L: 3 },
  ]);
});
