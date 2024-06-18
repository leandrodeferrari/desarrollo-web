const eventoRepository = require('../repository/eventoRepository');

/**
 * Obtiene todos los eventos.
 *
 * @return {Promise<any[]>} Retorna todos los eventos.
 */
exports.obtenerTodosLosEventos = async () => {
    try {
        return await eventoRepository.obtenerTodosLosEventos();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Obtiene un evento por su ID.
 *
 * @param {string} id - El ID del evento.
 * @return {Promise} Retorna una promesa con el evento (si lo encuentra).
 */
exports.obtenerEventoPorId = async (id) => {
    try {
        return await eventoRepository.obtenerEventoPorId(id);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Crea un nuevo evento.
 *
 * @param {Object} evento - Objeto que contiene la información del evento.
 * @param {string} evento.titulo - El titulo del evento.
 * @param {string} evento.imagenUrl - La URL de la imagen del evento.
 * @param {string} evento.descripcion - La descripcion del evento.
 * @param {string} evento.fecha - La fecha del evento.
 * @param {string} evento.horario - El horario del evento.
 * @param {string} evento.ubicacion - La ubicacion del evento.
 * @return {Promise<Object>} Retorna una promesa con el evento creado.
 */
exports.crearEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }) => {
    try {
        return await eventoRepository.crearEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Modifica un evento.
 *
 * @param {Object} evento - Objeto que contiene la información del evento.
 * @param {string} evento.titulo - El titulo del evento.
 * @param {string} evento.imagenUrl - La URL de la imagen del evento.
 * @param {string} evento.descripcion - La descripcion del evento.
 * @param {string} evento.fecha - La fecha del evento.
 * @param {string} evento.horario - El horario del evento.
 * @param {string} evento.ubicacion - La ubicacion del evento.
 * @param {string} id - El ID del evento que deseamos modificar.
 * @return {Promise<Object>} Retorna una promesa con el evento modificado.
 */
exports.modificarEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id) => {
    try {
        return await eventoRepository.modificarEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Elimina un evento por su ID.
 *
 * @param {string} id - El ID del evento que deseamos eliminar.
 * @return {Promise} Retorna una promesa con el resultado de la operacion de eliminacion.
 */
exports.eliminarEvento = async (id) => {
    try {
        return await eventoRepository.eliminarEvento(id);
    } catch (error) {
        console.log(error);
    }
}