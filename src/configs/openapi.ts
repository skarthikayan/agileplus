import openapiDocs from 'swagger-jsdoc';
import constants from './constants';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: constants.title,
      description: constants.description,
      version: '1.0.0',
      contact: {
        email: constants.email,
      },
    },
    servers: [
      { url: `${process.env.API_HOST}:${process.env.API_PORT}/api/v1` },
    ],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/*.ts'],
};

export default openapiDocs(options);
