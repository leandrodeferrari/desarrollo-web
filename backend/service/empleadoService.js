const empleadoRepository = require('../repository/empleadoRepository');

exports.getEmpleados = async () => {
    try {
        return await empleadoRepository.getEmpleadosDB();
    } catch (error) {
        console.log(error);
    }
}

exports.getEmpleadoPorId = async (id) => {
    try {
        return await empleadoRepository.obtenerEmpleadoPorIdDB(id);
    } catch (error) {
        console.log(error);
    }
}

exports.createEmpleado = async ({nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo }) => {
    try {
        return await empleadoRepository.crearEmpleadoDB({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  });
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