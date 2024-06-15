const eventoRepository = require('../repository/eventoRepository');

exports.obtenerTodosLosEventos = async () => {
    try {
        return await eventoRepository.obtenerTodosLosEventos();
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerEventoPorId = async (id) => {
    try {
        return await eventoRepository.obtenerEventoPorId(id);
    } catch (error) {
        console.log(error);
    }
}

exports.crearEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }) => {
    try {
        return await eventoRepository.crearEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion });
    } catch (error) {
        console.log(error);
    }
}

exports.modificarEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id) => {
    try {
        return await eventoRepository.modificarEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id);
    } catch (error) {
        console.log(error);
    }
}

exports.eliminarEvento = async (id) => {
    try {
        return await eventoRepository.eliminarEvento(id);
    } catch (error) {
        console.log(error);
    }
}