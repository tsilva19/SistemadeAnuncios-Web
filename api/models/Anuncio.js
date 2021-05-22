const Sequelize = require('sequelize');
const db = require('./db');

const Anuncio = db.define('anuncios', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

//Criar a tabela 
Anuncio.sync();
module.exports = Anuncio;