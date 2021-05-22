const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use((req, res, next) =>{
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Methods", "GET, PUT, POST, DELETE");
   res.header("Access-Control-Allow-Headers","X-PINGOTHER,Content-Type");
   app.use(cors())
  next(); 
})


const Anuncio = require('./models/Anuncio');

//const db = require('./models/db');

app.get('/', async (req, res) => {
 await Anuncio.findAll({ order: [['id', 'DESC']] }).then(function (anuncios) {
    res.json({ anuncios });
  });
});

app.get('/visualizar/:id', async (req, res) => {
  await Anuncio.findByPk(req.params.id)
    .then(anuncio => {
      return res.json({
        error: false,
        anuncio
      });
    }).catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: "Erro: Anúncio não encontrado"
      });
    })
});

app.post('/cadastrar', async (req, res) => {
  const resultCad = await Anuncio.create(
    req.body
  ).then(() => {

    res.json({
      error: false,
      message: "Anúncio Cadastrado com sucesso"
    })
  }).catch(function (erro) {

    res.status(400).json({
      error: true,
      message: "Erro: Anúncio não Cadastrado com sucesso"
    })
  });
});

app.put('/editar', async (req, res) =>{
  await Anuncio.update(req.body, {
    where: {id: req.body.id}
  }).then(function(){
     return res.json({
       error: false,
       message: "Anuncio alterado com sucesso"
     });
  }).catch(function(erro){
      return res.status(400).json({
        error: true,
        message: "Erro: não editado "
      });
  });
});

app.delete('/apagar/:id',async (req, res)=>{
 await Anuncio.destroy({
    where:{id: req.params.id}
  }).then(function(){
    return res.json({
      error: false,
      message: "Anuncio apagado com sucesso"
  });
 }).catch(function(erro){
  return res.status(400).json({
    error: true,
    message: "Erro: não apagado "
  });
});
});

app.listen(3333, function () {
  console.log("Servidor iniciado")
});