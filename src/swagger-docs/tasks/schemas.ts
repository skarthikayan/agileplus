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
  task: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Task-Name',
      },
      description: {
        type: 'string',
        example: 'Task Description',
      },
      hours: {
        type: 'number',
        example: 1,
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
        type: 'string',
        example: true,
        enum: [
          'NEW',
          'IN_PROGRESS',
          'IN_REVIEW',
          'DEPLOYED_TO_DEV',
          'MERGED_TO_MAIN_BRANCH',
          'DEPLOYED_TO_PROD',
        ],
      },
      backlog_id: {
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
