const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  saltRounds: 2,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});


const models = {
    Users: sequelize.import('../models/users'),
    Book: sequelize.import('../models/book'),
} 
  
  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });
    
  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  
  module.exports = models;
