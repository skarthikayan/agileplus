export default {
  // notFound: {
  //   description: 'Not Found',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'integer', example: 404 },
  //           message: { type: 'string', example: 'failed' },
  //           success: { type: 'boolean', example: false },
  //         },
  //       },
  //     },
  //   },
  // },
  // internalServerError: {
  //   description: 'Internal server error',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'integer', example: 500 },
  //           message: { type: 'string', example: 'failed' },
  //           success: { type: 'boolean', example: false },
  //         },
  //       },
  //     },
  //   },
  // },
  sprintList: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'success' },
            success: { type: 'boolean', example: true },
            data: {
              type: 'array',
              items: {
                allOf: [
                  {
                    $ref: '#/components/schemas/sprint',
                  },
                  {
                    $ref: '#/components/schemas/common',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  sprintDetails: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'success' },
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              allOf: [
                {
                  $ref: '#/components/schemas/sprint',
                },
                {
                  $ref: '#/components/schemas/common',
                },
              ],
            },
          },
        },
      },
    },
  },
};
