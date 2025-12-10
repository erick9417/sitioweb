module.exports = {
  apps: [
    {
      name: 'sitioweb',
      script: './node_modules/.bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
