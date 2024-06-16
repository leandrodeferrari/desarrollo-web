const Empleado = require('./empleado');
const conectarDB = require('../db/db');

conectarDB();

exports.getEmpleadosDB = async () => {
    try {
        let empleados = await Empleado.find();
        console.log(empleados)
        return empleados;
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerEmpleadoPorIdDB = async (id) => {
    try {
        let empleado = await Empleado.findById(id);
        return empleado;
    } catch (error) {
        console.log(error);
    }
}

exports.crearEmpleadoDB = async ({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo }) => {
    try {
        let nuevoEmpleado = new Empleado({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo });
        console.log(nuevoEmpleado)
        return await nuevoEmpleado.save();
    } catch (error) {
        console.log(error)
    }
}

exports.putEmpleadosDB = async ({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo},id) => {
    try {
        return await Empleado.findOneAndReplace({_id:id},{nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo});

    } catch (error) {
        console.log(error);
    }
}

exports.deleteEmpleadoDB = async (id) => {
    try {
        let empleado = await Empleado.findById(id)

        if(!empleado){
            console.log('no existe empleado')
            return "no existe empleado";
        }
        await Empleado.findOneAndDelete({_id:id});
        return "eliminado";

    } catch (error) {
        console.log(error);
    }
}