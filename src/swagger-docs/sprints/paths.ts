export default {
  '/sprints': {
    get: {
      tags: ['Sprint'],
      summary: 'List all Sprints',
      responses: {
        200: {
          $ref: '#/components/responses/sprintList',
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
      tags: ['Sprint'],
      summary: 'Create new sprint',
      responses: {
        200: {
          $ref: '#/components/responses/sprintDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      requestBody: {
        description: 'Create a new sprint',
        $ref: '#/components/requestBodies/sprintDetails',
        required: true,
      },
    },
  },
  '/sprints/{id}': {
    get: {
      tags: ['Sprint'],
      summary: 'Show sprint Details',
      responses: {
        200: {
          $ref: '#/components/responses/sprintDetails',
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
          description: 'ID of sprint to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
    },
    patch: {
      tags: ['Sprint'],
      summary: 'Edit Sprint Details',
      responses: {
        200: {
          $ref: '#/components/responses/sprintDetails',
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
          description: 'ID of sprint to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Create a new sprint',
        $ref: '#/components/requestBodies/sprintDetails',
        required: true,
      },
    },
    delete: {
      tags: ['Sprint'],
      summary: 'Delete Sprint Details',
      responses: {
        200: {
          $ref: '#/components/responses/sprintDetails',
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
          description: 'ID of sprint to delte',
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
