const mongoose = require('mongoose');

const usuariosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('usuarios', usuariosSchema);