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
  user: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Karthikayan',
      },
      nickname: {
        type: 'string',
        example: 'Karthi',
      },
      email: {
        type: 'string',
        example: 'skarthikayan7@gmail.com',
      },
      empid: {
        type: 'number',
        example: 12345,
      },
      status: {
        type: 'boolean',
        example: true,
      },
      role: {
        type: 'string',
        example: 'USER',
        enum: ['USER', 'SCRUM_MASTER'],
      },
    },
  },
};
