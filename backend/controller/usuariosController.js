const UsuariosService = require('../service/usuariosService'); //Importar la clase "usuariosService".
const usuarioServicio = new UsuariosService(); //Instanciar la clase "usuariosService".

class UsuariosController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuarioLogeado = await usuarioServicio.login(email,password);

      if(usuarioLogeado) {
        return res.status(200).send({ 
          descripcion: "Ha iniciado sesión con éxito.",
          usuario: usuarioLogeado
        });
      }
      else {
        return res.status(404).send({ 
          descripcion: "No se encontró al usuario."
        });
      }
    } catch (error) {
      return res.status(500).json({ 
        descripcion: "Error en el servidor al intentar iniciar sesión.",
        detalles: error.message
      });
      //console.error('Error en usuariosController.js (login):', error);
    }
  }

  async crearUsuario(req, res) {
    try {
      const { nombre, apellido, email, password } = req.body;
      const nuevoUsuario = await usuarioServicio.crearUsuario(nombre, apellido, email, password);
      return res.status(201).send({
        descripcion: "Usuario creado con éxito.",
        usuario: nuevoUsuario
      });
    } catch (error) {
      return res.status(500).json({
        descripcion: "Error en el servidor al intentar crear usuario.",
        detalles: error.message
      });
    }
  }
}

module.exports = UsuariosController;