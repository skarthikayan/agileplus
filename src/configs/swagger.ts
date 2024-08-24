import { paths, responses, schemas, requestBodies } from '../swagger-docs/';
import constants from './constants';

export default {
  openapi: '3.0.0',
  info: {
    title: constants.title,
    description: constants.description,
    version: '1.0.0',
    contact: {
      email: constants.email,
    },
  },
  servers: [{ url: `${process.env.API_HOST}:${process.env.API_PORT}/api/v1` }],
  paths,
  components: {
    responses,
    schemas,
    requestBodies,
  },
};
