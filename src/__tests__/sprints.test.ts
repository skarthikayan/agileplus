import request from 'supertest';
import { app } from '../index';
import constants from '../configs/constants';

describe('Sprints API', () => {
  let sprintId: number;

  it('should list all sprints', async () => {
    const response = await request(app).get(constants.baseUrl + '/sprints');
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should create a new sprint', async () => {
    const newSprint = {
      name: 'New Sprint',
      start_date: '2023-01-01',
      end_date: '2023-01-15',
      status: 'ACTIVE',
    };

    const response = await request(app).post('/sprints').send(newSprint);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(newSprint);
    sprintId = response.body.data.id;
  });

  it('should show sprint details', async () => {
    const response = await request(app).get(`/sprints/${sprintId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.id).toBe(sprintId);
  });

  it('should update a sprint', async () => {
    const updatedSprint = {
      name: 'Updated Sprint',
      start_date: '2023-01-01',
      end_date: '2023-01-20',
      status: 'COMPLETED',
    };

    const response = await request(app)
      .put(`/sprints/${sprintId}`)
      .send(updatedSprint);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(updatedSprint);
  });

  it('should delete a sprint', async () => {
    const response = await request(app).delete(`/sprints/${sprintId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Sprint deleted successfully');
  });
});
