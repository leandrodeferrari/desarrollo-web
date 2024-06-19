const UsuariosService = require('../service/usuariosService'); //Importar la clase "usuariosService".
const usuarioServicio = new UsuariosService(); //Instanciar la clase "usuariosService".

class UsuariosController {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
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

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async registrarUsuario(req, res) {
    try {
      const { nombre, apellido, email, password } = req.body;
      const usuarioCreado = await usuarioServicio.registrarUsuario(nombre, apellido, email, password);
      return res.status(201).send({
        descripcion: "Usuario creado con éxito.",
        usuario: usuarioCreado
      });
    } catch (error) {
      return res.status(500).json({
        descripcion: "Error en el servidor al intentar crear usuario.",
        detalles: error.message
      });
    }
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async editarUsuario(req, res) {
    try {
      const id = req.params.id;
      const { nombre, apellido, email } = req.body;
      const usuarioEditado = await usuarioServicio.editarUsuario(nombre, apellido, email, id);
      return res.status(201).send({
        descripcion: "Usuario actualizado con éxito.",
        usuario: usuarioEditado
      });
    } catch (error) {
      return res.status(500).json({
        descripcion: "Error en el servidor al intentar actualizar usuario.",
        detalles: error.message
      });
    }
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async editarPassword(req, res) {
    try {
      const { email, passwordVieja, passwordNueva } = req.body;
      const passwordEditada = await usuarioServicio.editarPassword(email, passwordVieja, passwordNueva);
      return res.status(201).send({
        descripcion: "Contraseña actualizada con éxito.",
        password: passwordEditada
      });
    } catch (error) {
      return res.status(500).json({
        descripcion: "Error en el servidor al intentar actualizar la contraseña.",
        detalles: error.message
      });
    }
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async borrarUsuario(req, res) {
    try {
      const { email } = req.body;
      const usuarioBorrado = await usuarioServicio.borrarUsuario(email);
      return res.status(201).send({
        descripcion: "Usuario borrado con éxito.",
        password: usuarioBorrado
      });
    } catch (error) {
      return res.status(500).json({
        descripcion: "Error en el servidor al intentar borrar el usuario.",
        detalles: error.message
      });
    }
  }
}

module.exports = UsuariosController;