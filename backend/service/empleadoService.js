const empleadoRepository = require('../repository/empleadoRepository');

exports.getEmpleados = async () => {
    try {
        return await empleadoRepository.getEmpleadosDB();
    } catch (error) {
        console.log(error);
    }
}

exports.putEmpleados = async () => {

}

exports.deleteEmpleado = async (id) => {
    try {
        return await empleadoRepository.deleteEmpleadoDB(id);
    } catch (error) {
        console.log(error);
    }
}