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

exports.putEmpleadosDB = async (id) => {
    try {
        let empleado = await Empleado.find(id);
        console.log(empleado)
        return empleado;
    } catch (error) {
        console.log(error);
    }
}

exports.deleteEmpleadoDB = async (id) => {
    try {
        console.log('ID recibido:', id);

        let empleado = await Empleado.findById(id)

        console.log('Empleado encontrado:', empleado);

        if(!empleado){
            console.log('no existe empleado')
            return "no existe empleado";
        }

        await Empleado.findOneAndDelete({_id:id});
        console.log('Empleado eliminado con ID:', id);
        return "eliminado";
        
    } catch (error) {
        console.log(error);
    }
}
