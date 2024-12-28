import request from 'supertest';
import { app } from '../index';
import constants from '../configs/constants';

describe('Backlogs API', () => {
  let backlogId: number;

  it('should list all backlogs', async () => {
    const response = await request(app).get(
      constants.baseUrl + '/backlogs' + '?sprint_id=1',
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should create a new backlog', async () => {
    const newBacklog = {
      name: 'New Backlog',
      story_points: 5,
      status: 'NEW',
      sprint_id: 1,
      user_id: 1,
    };

    const response = await request(app).post('/backlogs').send(newBacklog);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(newBacklog);
    backlogId = response.body.data.id;
  });

  it('should show backlog details', async () => {
    const response = await request(app).get(`/backlogs/${backlogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.id).toBe(backlogId);
  });

  it('should update backlog details', async () => {
    const updatedBacklog = {
      name: 'Updated Backlog',
      story_points: 8,
      status: 'IN_PROGRESS',
      sprint_id: 2,
      user_id: 2,
    };

    const response = await request(app)
      .patch(`/backlogs/${backlogId}`)
      .send(updatedBacklog);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(updatedBacklog);
  });

  it('should delete a backlog', async () => {
    const response = await request(app).delete(`/backlogs/${backlogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.id).toBe(backlogId);
  });
});
