const express = require('express');
const UsuariosController = require('../controller/usuariosController');
const usuariosControlador = new UsuariosController();
const usuariosRouter = express.Router();

//Middleware:
usuariosRouter.use(express.json());

usuariosRouter.post('/', usuariosControlador.login);

module.exports = usuariosRouter