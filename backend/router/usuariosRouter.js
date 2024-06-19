const express = require('express');
const UsuariosController = require('../controller/usuariosController');
const usuariosControlador = new UsuariosController();
const usuariosRouter = express.Router();

usuariosRouter.use(express.json());
usuariosRouter.post('/', usuariosControlador.login); //FUNCIONA.
usuariosRouter.post('/registrar', usuariosControlador.registrarUsuario); //FUNCIONA.
usuariosRouter.put('/editar-perfil/:id', usuariosControlador.editarUsuario); //FUNCIONA.
usuariosRouter.put('/editar-password', usuariosControlador.editarPassword); //FUNCIONA.
usuariosRouter.delete('/borrar', usuariosControlador.borrarUsuario); //FUNCIONA.

module.exports = usuariosRouter;