const env = {
    database: 'library',
    username: 'postgres',
    password: '',
    dialect: 'postgres',
    secret: 'secret',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };

  module.exports = env;
