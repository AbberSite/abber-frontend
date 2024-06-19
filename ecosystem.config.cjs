module.exports = {
  apps: [
    {
      name: 'Abebr',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      watch: true,

    }
  ]
}
