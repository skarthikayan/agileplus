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
  sprint: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Sprint name',
      },
      start_date: {
        type: 'string',
        example: '2024-08-21T19:13:08.440Z',
      },
      end_date: {
        type: 'string',
        example: '2024-08-21T19:13:08.440Z',
      },
      status: {
        type: 'boolean',
        example: true,
      },
    },
  },
};
