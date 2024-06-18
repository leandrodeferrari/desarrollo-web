const Evento = require('./evento');
const conectarDB = require('../db/db');

conectarDB();

/**
 * Obtiene todos los eventos de la base de datos.
 *
 * @return {Promise<Array<Object>>} Retorna un array con los eventos.
 */
exports.obtenerTodosLosEventos = async () => {
    try {
        let eventos = await Evento.find();

        return eventos;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Obtiene un evento de la base de datos, por su ID.
 *
 * @param {string} id - El ID del evento.
 * @return {Promise<Event>} Retorna una promesa con el evento buscado.
 */
exports.obtenerEventoPorId = async (id) => {
    try {
        let evento = await Evento.findById(id);

        return evento;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Crea un nuevo evento en la base de datos.
 *
 * @param {string} titulo - El titulo del evento.
 * @param {string} imagenUrl - La URL de la imagen del evento.
 * @param {string} descripcion - La descripcion del evento.
 * @param {string} fecha - La fecha del evento.
 * @param {string} horario - El horario del evento.
 * @param {string} ubicacion - La ubicacion del evento.
 * @return {Promise<Object>} Retorna una promesa con el evento creado.
 */
exports.crearEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }) => {
    try {
        let eventoCreado = new Evento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion });

        return await eventoCreado.save();
    } catch (error) {
        console.log(error)
    }
}

/**
 * Modifica un evento en la base de datos.
 *
 * @param {Object} evento - Objeto que contiene la información del evento.
 * @param {string} evento.titulo - El titulo del evento.
 * @param {string} evento.imagenUrl - La URL de la imagen del evento.
 * @param {string} evento.descripcion - La descripcion del evento.
 * @param {string} evento.fecha - La fecha del evento.
 * @param {string} evento.horario - El horario del evento.
 * @param {string} evento.ubicacion - La ubicacion del evento.
 * @param {string} id - El ID del evento que deseamos modificar.
 * @return {Promise<Object>} Retorna una promesa con el evento que modificamos.
 */
exports.modificarEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id) => {
    return await Evento.findOneAndReplace({ _id: id }, { titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, { new: true });
}

/**
 * Elimina un evento en la base de datos, por su ID.
 *
 * @param {string} id - El ID del evento.
 * @return {Promise} Retorna una promesa con el resultado de la operación de la eliminación.
 */
exports.eliminarEvento = async (id) => {
    try {
        let evento = await Evento.findById(id);

        if (!evento) {
            return false;
        }

        await Evento.findOneAndDelete({ _id: id });
        return true;
    } catch (error) {
        console.log(error);
    }
}