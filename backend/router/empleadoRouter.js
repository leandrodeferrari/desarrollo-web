const express = require('express');
const empleadoController = require('../controller/empleadoController')
const empleadoRouter = express.Router();

//Middleware
empleadoRouter.use(express.json());

empleadoRouter.get('/', empleadoController.readEmpleados);
empleadoRouter.delete('/:id', empleadoController.deleteEmpleado);
empleadoRouter.put('/:id', empleadoController.updateEmpleado)

module.exports = empleadoRouter