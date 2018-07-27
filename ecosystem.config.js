module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'PHONE CASE STORE API',
      script    : './dist/main.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        MONGODB_CONNECTION: 'mongodb://13.210.159.104/phonecasestore',
        TOKEN_SECRET: 'ilovescotchyscotch',
        UPLOAD_FILES_PATH: './dist/uploads'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 3000,
        MONGODB_CONNECTION: 'mongodb://mongo/phonecasestore',
        TOKEN_SECRET: 'ilovescotchyscotch',
        UPLOAD_FILES_PATH: './dist/uploads'
      }
    }
  ]

};
