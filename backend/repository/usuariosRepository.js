const usuariosODM = require('./usuarios');
const conectarDB = require('../db/db');
const color = require('colors');
const bcrypt = require('bcrypt');

conectarDB();

class UsuariosRepository {
    async login(email, password) {
        try {
            /* Equivalente a "SELECT * FROM usuarios WHERE email=email AND password=password LIMIT 1" pero con ODM, 
            con "await" esperando la respuesta y se retorna. */
            console.log(`UsuariosRepository: Buscando usuario con email: ${email}`.yellow);
            const usuario = await usuariosODM.findOne({ 
                email: email
            });

            if (!usuario) {
                console.log(`UsuariosRepository: Usuario con email ${email} no encontrado`.red); // Agregar log para verificar si el usuario no fue encontrado
                return null;
            }
            else {
                console.log(`UsuariosRepository: Usuario con email ${email} encontrado`.green, '\n',usuario);
            }

            console.log(`Comparando passwords: ${password} y ${usuario.password}`.yellow); // Log para comparar las contraseñas
            const isPasswordValid = await bcrypt.compare(password, usuario.password);
            
            if (isPasswordValid) {
                console.log('UsuariosRepository: Desencriptación válida.'.green); // Agregar log para contraseña válida
                return usuario;
            } else {
                console.log('UsuariosRepository: No se desencriptó.'.red); // Agregar log para contraseña no válida
                return null;
            }

            /* if (usuario && await bcrypt.compare(password, usuario.password)) { return usuario; } 
            else { return null; } */

        } catch (error) {
            console.error('Error en usuariosRepository.js (login):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "login" del repositorio, 
            que es llamada por "login" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    }

    async crearUsuario(nombre, apellido, email, password) {
        try {
            const nuevoUsuario = await usuariosODM.create({
                nombre,
                apellido,
                email,
                password
            });
            console.log('Usuario creado:'.green, nuevoUsuario);
            return nuevoUsuario;
        } catch (error) {
            throw new Error(error);
        }     
    }
}

module.exports = UsuariosRepository;