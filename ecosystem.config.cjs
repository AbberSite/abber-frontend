module.exports = {
  apps: [
    {
      name: 'Abebr',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        ABBER_ENV: 'production',
      },
    },
    {
      name: 'AbebrTest',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        ABBER_ENV: 'dev',
      },
    },
  ],
}
