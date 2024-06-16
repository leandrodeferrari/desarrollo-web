const conectarDB = require('../db/db');
const empleado = require('./empleado');

conectarDB();

exports.obtenerTodosLosEmpleados = async () => {
    try {
        let empleados = await empleado.find();
        console.log(empleados)

        return empleados;
    } catch (error) {
        console.log(error);
    }
}