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
        MONGODB_CONNECTION: 'mongodb://13.236.73.43/phonecasestore',
        TOKEN_SECRET: 'ilovescotchyscotch',
        UPLOAD_FILES_PATH: './dist/uploads'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 8080,
        MONGODB_CONNECTION: 'mongodb://13.236.73.43/phonecasestore',
        TOKEN_SECRET: 'ilovescotchyscotch',
      }
    }
  ]

};
