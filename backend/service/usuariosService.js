const UsuariosRepository = require('../repository/usuariosRepository');
const usuarioRepositorio = new UsuariosRepository();
const color = require('colors');
const bcrypt = require('bcrypt');

class UsuariosService {
  async login(email, password) {
    try {
      const usuarioLogeado = await usuarioRepositorio.login(email, password);
        if (!usuarioLogeado) {
          throw new Error('UsuariosService: No existe el usuario.'.red); //El throw hará una resolución ascendente.
        }
        else {
          return usuarioLogeado;
        }
    } catch (error) {
      console.error('Error en usuariosService.js (login):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "login" del servicio, que es llamada por "login" 
      del controlador, por lo que el error se resolverá allí. */
      throw new Error(error); 
    }
  }

  async crearUsuario(nombre, apellido, email, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(`Password original: ${password}`.cyan);
      console.log(`Password hasheado: ${hashedPassword}`.cyan);
      const nuevoUsuario = await usuarioRepositorio.crearUsuario(nombre, apellido, email, hashedPassword);
      return nuevoUsuario;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UsuariosService;