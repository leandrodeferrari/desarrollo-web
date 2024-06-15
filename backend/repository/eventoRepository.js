const Evento = require('./evento');
const conectarDB = require('../db/db');

conectarDB();

exports.obtenerTodosLosEventos = async () => {
    try {
        let eventos = await Evento.find();

        return eventos;
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerEventoPorId = async (id) => {
    try {
        let evento = await Evento.findById(id);

        return evento;
    } catch (error) {
        console.log(error);
    }
}

exports.crearEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }) => {
    try {
        let eventoCreado = new Evento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion });

        return await eventoCreado.save();
    } catch (error) {
        console.log(error)
    }
}

exports.modificarEvento = async ({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id) => {
    return await Evento.findOneAndReplace({ _id: id }, { titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, { new: true });
}

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