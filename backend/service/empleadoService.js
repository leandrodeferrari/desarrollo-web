const empleadoRepository = require('../repository/empleadoRepository');

exports.obtenerTodosLosEmpleados = async () => {
    try {
        return await empleadoRepository.obtenerTodosLosEmpleados();
    } catch (error) {
        console.log(error);
    }
}