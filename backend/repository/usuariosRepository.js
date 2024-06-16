const loginODM = require('./usuarios');
const conectarDB = require('../db/db');
const color = require('colors');

conectarDB();

class UsuariosRepository {
    async login(email, password) {
        try {
            /* Equivalente a "SELECT * FROM usuarios WHERE email=email AND password=password LIMIT 1" pero con ODM, 
            con "await" esperando la respuesta y se retorna. */
            return await loginODM.findOne({ 
                email: email,
                password: password
            });
        } catch (error) {
            //console.error('Error en usuariosRepository.js (login):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "login" del repositorio, 
            que es llamada por "login" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    } //FUNCIONA.
}

module.exports = UsuariosRepository;