const usuariosODM = require('./usuarios');
const conectarDB = require('../db/db');
const color = require('colors');
const bcrypt = require('bcrypt');
conectarDB();

class UsuariosRepository {
    /**
     * Busca un usuario en la base de datos.
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async login(email) {
        try {
            /* Equivalente a "SELECT * FROM usuarios WHERE email=email AND password=password LIMIT 1" pero con ODM, 
            con "await" esperando la respuesta y se retorna. */
            return await usuariosODM.findOne({ email: email });
        } catch (error) {
            //console.error('Error en usuariosRepository.js (login):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "login" del repositorio, 
            que es llamada por "login" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    }

    /**
     * Crea un usuario en la base de datos.
     * @param {*} nombre 
     * @param {*} apellido 
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async registrarUsuario(nombre, apellido, email, password) {
        try {
            /* Equivalente a "INSERT INTO usuarios(nombre, apellido, email, password) 
            VALUES(nombre, apellido, email, password)" pero con ODM, con "await" esperando la respuesta 
            y se retorna. */
            return await usuariosODM.create({
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password
            });
        } catch (error) {
            //console.error('Error en usuariosRepository.js (crearUsuario):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "crearUsuario" del repositorio, 
            que es llamada por "crearUsuario" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    }

    /**
     * Edita los datos de un usuario existente.
     * @param {*} nombre 
     * @param {*} apellido 
     * @param {*} email 
     * @param {*} password 
     */
    async editarUsuario(nombre, apellido, email, id) {
        try {
            /* Equivalente a "UPDATE usuarios SET nombre=nombre, apellido=apellido... WHERE _id=usuarios._id" pero 
            con ODM, con "await" esperando la respuesta y se retorna. */
            return await usuariosODM.findOneAndUpdate(
                { _id: id }, //WHERE (_id es el campo ID predeterminado en los modelos hechos en Mongoose).
                { //SET
                    nombre: nombre,
                    apellido: apellido,
                    email: email
                },
                { new: true } //Retorna el nuevo documento actualizado.
            );
        } catch (error) {
            //console.error('Error en usuariosRepository.js (actualizarUsuario):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "actualizarUsuario" del repositorio, 
            que es llamada por "actualizarUsuario" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    }

    /**
     * Actualiza la contraseña.
     * @param {*} email 
     * @param {*} passwordVieja 
     * @param {*} passwordNueva 
     * @returns 
     */
    async editarPassword(email, passwordVieja, passwordNueva) {
        /* Equivalente a "UPDATE usuarios SET password=passwordNueva WHERE email=email AND password=passwordVieja"
        pero con ODM, con "await" esperando la respuesta y se retorna. */
        return await usuariosODM.findOneAndUpdate(
            { //WHERE
                email: email,
                password: passwordVieja
            }, 
            { password: passwordNueva }, //SET 
            { new: true } //Retorna el nuevo documento actualizado.
        );
    }

    /**
     * Borrar un usuario en la base de datos mediante el email (que es un exclusivo de un usuario).
     * @param {*} email 
     */
    async borrarUsuario(email) {
        try {
            /* Equivalente a "DELETE FROM usuarios WHERE email=email" pero con ODM, con "await" esperando 
            la respuesta y se retorna. */
            return await usuariosODM.findOneAndDelete({ email: email });
        } catch (error) {
            //console.error('Error en usuariosRepository.js (borrarUsuario):'.bgRed, error);
            /* El throw realiza una llamada ascendente para la resolución del error, es decir, la resolución 
            del error se terceriza a la función que llamó a esta. Esta es "borrarUsuario" del repositorio, 
            que es llamada por "borrarUsuario" del servicio, por lo que el error se resolverá allí. */
            throw new Error(error);
        }
    }
}

module.exports = UsuariosRepository;