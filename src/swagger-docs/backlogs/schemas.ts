export default {
  common: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 12345,
      },
      created_at: {
        type: 'string',
        example: '2024-08-21T19:13:08.440Z',
      },
      updated_at: {
        type: 'string',
        example: '2024-08-21T19:13:08.440Z',
      },
    },
  },
  backlog: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Backlog Name',
      },
      story_points: {
        type: 'number',
        example: 1,
      },
      status: {
        type: 'string',
        example: true,
        enum: ['NEW', 'IN_PROGRESS', 'COMPLETED'],
      },
      sprint_id: {
        type: 'number',
        example: 1,
      },
      user_id: {
        type: 'number',
        example: 1,
      },
    },
  },
};
