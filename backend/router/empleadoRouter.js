const express = require('express');
const empleadoController = require('../controller/empleadoController')
const empleadoRouter = express.Router();

//Middleware
empleadoRouter.use(express.json());

empleadoRouter.get('/', empleadoController.obtenerTodosLosEmpleados);


module.exports = empleadoRouter