module.exports = {
  apps: [
    {
      name: 'Agileplus-api',
      script: '/agileplus/build/src/index.js',
      out_file: '/agileplus/logs/output.log',
      error_file: '/agileplus/logs/output.log',
      log_type: 'json',
      time: true,
    },
  ],
};
