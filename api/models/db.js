const Sequelize = require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'root',{
  host: 'localhost',
  dialect: 'mysql'
})

// sequelize.authenticate()
// .then(function(){
//   console.log("Conexão ao banco de dados realizada!!");
// }).catch(function(err){
//   console.log("Erro : Conexão não realiza")
// })

module.exports = sequelize;