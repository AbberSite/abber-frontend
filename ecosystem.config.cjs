module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'NODE_ENV=production ./.output/server/index.mjs'
    }
  ]
}
