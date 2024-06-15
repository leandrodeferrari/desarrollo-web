const mongoose = require('mongoose');

const eventoSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        imagenUrl: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        },
        horario: {
            type: String,
            required: true
        },
        ubicacion: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('eventos', eventoSchema);