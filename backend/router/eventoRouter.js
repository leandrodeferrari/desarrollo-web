const express = require('express');
const eventoController = require('../controller/eventoController')
const eventoRouter = express.Router();

//Middleware
eventoRouter.use(express.json());

eventoRouter.get('/', eventoController.obtenerTodosLosEventos);
eventoRouter.get('/:id', eventoController.obtenerEventoPorId);
eventoRouter.post('/', eventoController.crearEvento);
eventoRouter.put('/:id', eventoController.modificarEvento);
eventoRouter.delete('/:id', eventoController.eliminarEvento);

module.exports = eventoRouter