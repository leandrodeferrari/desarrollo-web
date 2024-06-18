const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

/* usuariosSchema.pre('save', async function(next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
      next();
    } catch (error) {
      next(error);
    }
}); */

module.exports = mongoose.model('usuarios', usuariosSchema);