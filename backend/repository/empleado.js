const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        documento: {
            type: String,
            required: true
        },
        categoria: {
            type: String,
            required: true
        },
        fecha_nacimiento: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        modalidad_trabajo: {
            type: String,
            required: true
        },        
        hora_entrada: {
            type: String,
            required: true
        },
        hora_salida: {
            type: String,
            required: true
        },        
        activo: {
            type: Boolean,
            required: true
        }        
    }
)

module.exports = mongoose.model('empleados', empleadoSchema);