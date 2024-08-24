export default {
  '/tasks': {
    get: {
      tags: ['Task'],
      summary: 'List all Tasks',
      responses: {
        200: {
          $ref: '#/components/responses/taskList',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
    },
    post: {
      tags: ['Task'],
      summary: 'Create new task',
      responses: {
        200: {
          $ref: '#/components/responses/taskDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      requestBody: {
        description: 'Create a new task',
        $ref: '#/components/requestBodies/taskDetails',
        required: true,
      },
    },
  },
  '/tasks/{id}': {
    get: {
      tags: ['Task'],
      summary: 'Show task Details',
      responses: {
        200: {
          $ref: '#/components/responses/taskDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of task to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
    },
    patch: {
      tags: ['Task'],
      summary: 'Edit Task Details',
      responses: {
        200: {
          $ref: '#/components/responses/taskDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of task to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Create a new task',
        $ref: '#/components/requestBodies/taskDetails',
        required: true,
      },
    },
    delete: {
      tags: ['Task'],
      summary: 'Delete Task Details',
      responses: {
        200: {
          $ref: '#/components/responses/taskDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of task to delte',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
    },
  },
};
