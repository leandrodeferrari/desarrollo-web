const Empleado = require('./empleado');
const conectarDB = require('../db/db');

conectarDB();

/**
 * Método para obtener la lista de empleados desde la base de datos. Si la operación es exitosa, se devuelve la lista de empleados, sino se registra en la consola el error.
 * @returns {Array} empleados - La lista de empleados obtenida de la base de datos.
 * @throws {Error} Si ocurre un error al acceder a la base de datos, se captura y se registra en la consola.
 */
 
exports.getEmpleadosDB = async () => {
    try {
        let empleados = await Empleado.find();
        return empleados;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Método para obtener un empleado por su ID desde la base de datos.
 * @param {string} id - ID del empleado que se desea obtener de la base de datos
 * @returns {Object} - Retorna el objeto del empleado que se desea encontrar.
 * @throws {Error} Si ocurre un error al acceder a la base de datos, se captura y se registra en la consola.
 */
exports.obtenerEmpleadoPorIdDB = async (id) => {
    try {
        let empleado = await Empleado.findById(id);
        return empleado;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Método para crear un nuevo empleado en la base de datos.
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
 * @throws {error} Si ocurre un error al acceder a la base de datos, se captura y se registra en la consola.
 */
exports.crearEmpleadoDB = async ({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo }) => {
    try {
        let nuevoEmpleado = new Empleado({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo });
        return await nuevoEmpleado.save();
    } catch (error) {
        console.log(error)
    }
}

/**
 * Método para modificar un nuevo empleado en la base de datos.
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
 * @throws {error} Si ocurre un error al acceder a la base de datos, se captura y se registra en la consola.
 */
exports.putEmpleadosDB = async ({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo},id) => {
    try {
        return await Empleado.findOneAndReplace({_id:id},{nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo});

    } catch (error) {
        console.log(error);
    }
}

/**
 * Método para eliminar un empleado en la base de datos utilizando su ID.
 * 
 * @param {string} id - El ID del empleado que se desea eliminar.
 * @returns {string} - Mensaje indicando el resultado de la operación.
 * @throws {error} Si ocurre un error al acceder a la base de datos, se captura y se registra en la consola.
 */
exports.deleteEmpleadoDB = async (id) => {
    try {
        let empleado = await Empleado.findById(id)

        if(!empleado){
            return "no existe empleado";
        }
        await Empleado.findOneAndDelete({_id:id});
        return "eliminado";

    } catch (error) {
        console.log(error);
    }
}