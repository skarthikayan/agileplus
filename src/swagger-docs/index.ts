import userPaths from './users/paths';
import userResponses from './users/responses';
import userSchemas from './users/schemas';
import userRequestBodies from './users/requestBodies';

import sprintPaths from './sprints/paths';
import sprintResponses from './sprints/responses';
import sprintSchemas from './sprints/schemas';
import sprintRequestBodies from './sprints/requestBodies';

import backlogPaths from './backlogs/paths';
import backlogResponses from './backlogs/responses';
import backlogSchemas from './backlogs/schemas';
import backlogRequestBodies from './backlogs/requestBodies';

import taskPaths from './tasks/paths';
import taskResponses from './tasks/responses';
import taskSchemas from './tasks/schemas';
import taskRequestBodies from './tasks/requestBodies';

export const paths = {
  ...userPaths,
  ...sprintPaths,
  ...backlogPaths,
  ...taskPaths,
};
export const responses = {
  ...userResponses,
  ...sprintResponses,
  ...backlogResponses,
  ...taskResponses,
};
export const schemas = {
  ...userSchemas,
  ...sprintSchemas,
  ...backlogSchemas,
  ...taskSchemas,
};
export const requestBodies = {
  ...userRequestBodies,
  ...sprintRequestBodies,
  ...backlogRequestBodies,
  ...taskRequestBodies,
};
