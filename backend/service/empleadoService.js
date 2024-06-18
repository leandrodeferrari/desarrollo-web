const empleadoRepository = require('../repository/empleadoRepository');

/**
 * Método para llamar al método del repositorio que permite obtener todos los empleados de la base de datos
 * @returns {Array} - Una lista de empleados.
 * @throws {Error} Si ocurre un error, se captura y se registra en la consola.
 */
exports.getEmpleados = async () => {
    try {
        return await empleadoRepository.getEmpleadosDB();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Método para llamar al método del repositorio que permite obtener un empleado de la base de datos, a través de su ID.
 * @returns {objeto} - Retorna el objeto del empleado que se desea encontrar..
 * @throws {Error} Si ocurre un error, se captura y se registra en la consola.
 */
exports.getEmpleadoPorId = async (id) => {
    try {
        return await empleadoRepository.obtenerEmpleadoPorIdDB(id);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Método para llamar al método del repositorio que permite crear un empleado en la base de datos.
 * @param {string} nombre - El nombre del empleado.
 * @param {string} apellido - El apellido del empleado.
 * @param {string} documento - El documento de identidad del empleado.
 * @param {string} categoria - La categoría del empleado.
 * @param {string} fecha_nacimiento - La fecha de nacimiento del empleado.
 * @param {string} email - El correo electrónico del empleado.
 * @param {string} modalidad_trabajo - La modalidad de trabajo del empleado.
 * @param {string} hora_entrada - La hora de entrada del empleado.
 * @param {string} hora_salida - La hora de salida del empleado.
 * @param {boolean} activo - El estado de actividad del empleado.
 * @returns {Object} - El objeto del empleado creado.
 * @throws {error} Si ocurre un error, se captura y se registra en la consola.
 */
exports.createEmpleado = async ({nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo }) => {
    try {
        return await empleadoRepository.crearEmpleadoDB({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo});
    } catch (error) {
        console.log(error);
    }

}

/**
 * Método para llamar al método del repositorio que permite modificar un empleado en la base de datos.
 * @param {string} nombre - El nombre del empleado.
 * @param {string} apellido - El apellido del empleado.
 * @param {string} documento - El documento de identidad del empleado.
 * @param {string} categoria - La categoría del empleado.
 * @param {string} fecha_nacimiento - La fecha de nacimiento del empleado.
 * @param {string} email - El correo electrónico del empleado.
 * @param {string} modalidad_trabajo - La modalidad de trabajo del empleado.
 * @param {string} hora_entrada - La hora de entrada del empleado.
 * @param {string} hora_salida - La hora de salida del empleado.
 * @param {boolean} activo - El estado de actividad del empleado.
 * @param {string} id - El ID del empleado que se desea actualizar.
 * @returns {Object} - El objeto del empleado creado.
 * @throws {error} Si ocurre un error, se captura y se registra en la consola.
 */
exports.putEmpleados = async ({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo},id) => {
    try {
        return await empleadoRepository.putEmpleadosDB({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo},id);
    } catch (error) {
        console.log(error);
    }
}

/**
 *  Método para llamar al método del repositorio que permite eliminar un empleado de la base de datos.
 * @param {string} id - El ID del empleado que se desea eliminar.
 * @returns {string} - Mensaje indicando el resultado de la operación.
 * @throws {error} Si ocurre un error, se captura y se registra en la consola.
 */

exports.deleteEmpleado = async (id) => {
    try {
        return await empleadoRepository.deleteEmpleadoDB(id);
    } catch (error) {
        console.log(error);
    }
}