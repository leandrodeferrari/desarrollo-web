const UsuariosRepository = require('../repository/usuariosRepository');
const usuarioRepositorio = new UsuariosRepository();
const color = require('colors');
const bcrypt = require('bcrypt');

class UsuariosService {
  /**
   * 
   * @param {*} email 
   * @param {*} password 
   * @returns 
   */
  async login(email, password) {
    try {
      const usuario = await usuarioRepositorio.login(email);
      if (usuario && await bcrypt.compare(password, usuario.password)) { return usuario; } 
      else { return null; }

      /* if (!usuario) {
        console.log(`UsuariosService: Usuario con email ${email} no encontrado`.red); // Agregar log para verificar si el usuario no fue encontrado
        return null;
      }
      else {
        console.log(`UsuariosService: Usuario con email ${email} encontrado`.green, '\n',usuario);
      }

      console.log(`Comparando passwords: ${password} y ${usuario.password}`.yellow); // Log para comparar las contraseñas
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
            
      if (isPasswordValid) {
        console.log('UsuariosService: Desencriptación válida.'.green); // Agregar log para contraseña válida
        return usuario;
      } else {
        console.log('UsuariosRepository: No se desencriptó.'.red); // Agregar log para contraseña no válida
        return null;
      } */
    } catch (error) {
      //console.error('Error en usuariosService.js (login):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "login" del servicio, que es llamada por "login" 
      del controlador, por lo que el error se resolverá allí. */
      throw new Error(error); 
    }
  }

  /**
   * Encripta las contraseñas.
   * @returns : devuelve un hash.
   */
  async encriptar(password) {
    /**
     * Los "salt" son bytes aleatorios que se unen al hash para generar información de relleno y que la 
     * contraseña no pueda ser deducida mediante el uso de "rainbow tables". Los "rainbow tables" son tablas
     * que recopilan los resultados obtenidos de hash crakeados. Si tu hash se parece a un hash crackeado 
     * puede obtenerse tu contraseña. Usa el "salt" para confundir.
     */
    const salt = await bcrypt.genSalt(10); //10 bytes.
    return await bcrypt.hash(password, salt);
  }

  /**
   * 
   * @param {*} nombre 
   * @param {*} apellido 
   * @param {*} email 
   * @param {*} password 
   * @returns 
   */
  async registrarUsuario(nombre, apellido, email, password) {
    try {
      const passwordEncriptada = await this.encriptar(password);
      //console.log(`Password original: ${password}`.cyan);
      //console.log(`Password hasheado: ${hashedPassword}`.cyan);
      return await usuarioRepositorio.registrarUsuario(nombre, apellido, email, passwordEncriptada);
    } catch (error) {
      //console.error('Error en usuariosService.js (crearUsuario):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "crearUsuario" del servicio, que es llamada por "crearUsuario" 
      del controlador, por lo que el error se resolverá allí. */
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {*} nombre 
   * @param {*} apellido 
   * @param {*} email 
   * @returns 
   */
  async editarUsuario(nombre, apellido, email, id) {
    try {
      return await usuarioRepositorio.editarUsuario(nombre, apellido, email, id);
    } catch (error) {
      //console.error('Error en usuariosService.js (actualizarUsuario):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "actualizarUsuario" del servicio, que es llamada 
      por "actualizarUsuario" del controlador, por lo que el error se resolverá allí. */
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {*} email 
   * @param {*} passwordVieja 
   * @param {*} passwordNueva 
   * @returns 
   */
  async editarPassword(email, passwordVieja, passwordNueva) {
    try {
      const usuario = await usuarioRepositorio.login(email); //Login se usa para obtener un objeto "usuarios". Es instrumental a este propósito.
      if (usuario && await bcrypt.compare(passwordVieja, usuario.password)) { 
        const passwordNuevaEncriptada = await this.encriptar(passwordNueva);
        return await usuarioRepositorio.editarPassword(email, usuario.password, passwordNuevaEncriptada);
      } 
      else { 
        return null; 
      }
    } catch (error) {
      //console.error('Error en usuariosService.js (actualizarPassword):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "actualizarPassword" del servicio, que es llamada 
      por "actualizarPassword" del controlador, por lo que el error se resolverá allí. */
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {*} email 
   * @returns 
   */
  async borrarUsuario(email) {
    try {
      return await usuarioRepositorio.borrarUsuario(email);
    } catch (error) {
      //console.error('Error en usuariosService.js (borrarUsuario):'.bgRed, error);
      /* El throw realiza una resolución ascendente del error, es decir, la resolución del error se terceriza 
      a la función que llamó a esta. Esta es "borrarUsuario" del servicio, que es llamada 
      por "borrarUsuario" del controlador, por lo que el error se resolverá allí. */
      throw new Error(error);
    }
  }
}

module.exports = UsuariosService;