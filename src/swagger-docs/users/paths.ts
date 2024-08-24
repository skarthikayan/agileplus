export default {
  '/users': {
    get: {
      tags: ['User'],
      summary: 'List all Users',
      responses: {
        200: {
          $ref: '#/components/responses/userList',
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
      tags: ['User'],
      summary: 'Create new user',
      responses: {
        200: {
          $ref: '#/components/responses/userDetails',
        },
        404: {
          $ref: '#/components/responses/notFound',
        },
        500: {
          $ref: '#/components/responses/internalServerError',
        },
      },
      requestBody: {
        description: 'Create a new user',
        $ref: '#/components/requestBodies/userDetails',
        required: true,
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: ['User'],
      summary: 'Show user Details',
      responses: {
        200: {
          $ref: '#/components/responses/userDetails',
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
          description: 'ID of user to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
    },
    patch: {
      tags: ['User'],
      summary: 'Edit User Details',
      responses: {
        200: {
          $ref: '#/components/responses/userDetails',
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
          description: 'ID of user to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Create a new user',
        $ref: '#/components/requestBodies/userDetails',
        required: true,
      },
    },
    delete: {
      tags: ['User'],
      summary: 'Delete User Details',
      responses: {
        200: {
          $ref: '#/components/responses/userDetails',
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
          description: 'ID of user to delte',
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
