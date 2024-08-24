export default {
  '/backlogs': {
    get: {
      tags: ['Backlog'],
      summary: 'List all Backlogs',
      responses: {
        200: {
          $ref: '#/components/responses/backlogList',
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
      tags: ['Backlog'],
      summary: 'Create new backlog',
      responses: {
        200: {
          $ref: '#/components/responses/backlogDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      requestBody: {
        description: 'Create a new backlog',
        $ref: '#/components/requestBodies/backlogDetails',
        required: true,
      },
    },
  },
  '/backlogs/{id}': {
    get: {
      tags: ['Backlog'],
      summary: 'Show backlog Details',
      responses: {
        200: {
          $ref: '#/components/responses/backlogDetails',
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
          description: 'ID of backlog to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
    },
    patch: {
      tags: ['Backlog'],
      summary: 'Edit Backlog Details',
      responses: {
        200: {
          $ref: '#/components/responses/backlogDetails',
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
          description: 'ID of backlog to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Create a new backlog',
        $ref: '#/components/requestBodies/backlogDetails',
        required: true,
      },
    },
    delete: {
      tags: ['Backlog'],
      summary: 'Delete Backlog Details',
      responses: {
        200: {
          $ref: '#/components/responses/backlogDetails',
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
          description: 'ID of backlog to delte',
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
