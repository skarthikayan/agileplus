import 'dotenv/config';
import openApiDocs from './src/configs/openapi';
import fs from 'fs';
fs.writeFile(
  './openapi.json',
  JSON.stringify(openApiDocs, null, 2),
  (error) => {
    if (error) console.log('Error updating openapi.json');
    console.log('openapi.json updated');
  },
);
