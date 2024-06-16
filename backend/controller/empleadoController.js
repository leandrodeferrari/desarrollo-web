const empleadoService = require('../service/empleadoService');

exports.obtenerTodosLosEmpleados = async (req, res) => {
    try {
        let empleados = await empleadoService.obtenerTodosLosEmpleados();

        return res.status(200).send(empleados);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al intentar obtener todos los empleados." })
    }
}