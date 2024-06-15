const eventoService = require('../service/eventoService');

exports.obtenerTodosLosEventos = async (req, res) => {
    try {
        let eventos = await eventoService.obtenerTodosLosEventos();

        return res.status(200).send(eventos);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al intentar obtener todos los eventos." })
    }
}

exports.obtenerEventoPorId = async (req, res) => {
    try {
        let id = req.params.id;

        let evento = await eventoService.obtenerEventoPorId(id);

        if (!evento) {
            return res.status(404).json({ mensaje: `No existe evento con el ID:  ${id}` })
        }

        return res.status(200).json(evento);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: `Hubo un error al intentar obtener el evento con el ID: ${id}.` });
    }
}

exports.crearEvento = async (req, res) => {
    try {
        const { titulo, imagenUrl, descripcion, fecha, horario, ubicacion } = req.body;

        let evento = await eventoService.crearEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion });

        return res.status(201).send(evento);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al crear el evento." })
    }
}

exports.modificarEvento = async (req, res) => {
    try {
        const { titulo, imagenUrl, descripcion, fecha, horario, ubicacion } = req.body;
        let id = req.params.id;

        let evento = await eventoService.modificarEvento({ titulo, imagenUrl, descripcion, fecha, horario, ubicacion }, id);

        if (!evento) {
            return res.status(404).send({ mensaje: `No existe el evento que desea modificar, con el ID: ${id}.` });
        }

        return res.status(200).send(evento);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: `Hubo un error al modificar el evento, con el ID: ${id}.` });
    }
}

exports.eliminarEvento = async (req, res) => {
    try {
        let id = req.params.id;

        let fueEliminado = await eventoService.eliminarEvento(id);

        if (!fueEliminado) {
            return res.status(404).send({ mensaje: `No existe evento con el ID: ${id}.` });
        } else {
            return res.status(200).send({ mensaje: "El evento fue eliminado correctamente." });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: `Hubo un error al eliminar el evento, con el ID: ${id}.` })
    }
}