const express = require('express');
const UsuariosController = require('../controller/usuariosController');
const usuariosControlador = new UsuariosController();
const usuariosRouter = express.Router();

usuariosRouter.use(express.json());
usuariosRouter.post('/', usuariosControlador.login);
usuariosRouter.post('/registrar', usuariosControlador.crearUsuario);

module.exports = usuariosRouter;