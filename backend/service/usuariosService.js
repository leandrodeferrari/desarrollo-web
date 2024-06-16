const UsuariosRepository = require('../repository/usuariosRepository');
const usuarioRepositorio = new UsuariosRepository();
const color = require('colors');

class UsuariosService {
    async login(email, password) {
        try {
          const usuarioLogeado = await usuarioRepositorio.login(email, password);
          if (!usuarioLogeado) {
            throw new Error('No existe el usuario.'); //El throw hará una resolución ascendente.
          }
          else {
            return usuarioLogeado;
          }
        } catch (error) {
            //console.error('Error en usuariosService.js (login):'.bgRed, error);
            /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
            a la función que llamó a esta. Esta es "login" del servicio, que es llamada por "login" 
            del controlador, por lo que el error se resolverá allí. */
            throw new Error(error); 
        }
      }
}

module.exports = UsuariosService;