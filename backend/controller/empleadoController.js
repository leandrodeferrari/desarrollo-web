const empleadoService = require('../service/empleadoService');

exports.readEmpleados = async (req, res) => {
    try {
        let empleados = await empleadoService.getEmpleados();
        return res.status(200).send(empleados);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al intentar obtener todos los empleados." })
    }
}

exports.readEmpleadoPorId = async (req, res) => {
    try {
        let id = req.params.id;

        let empleado = await empleadoService.getEmpleadoPorId(id);

        if (!empleado) {
            return res.status(404).json({ mensaje: `El empledo con el id nro. ${id}, no existe` })
        }
        
        return res.status(200).json(empleado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: `Hubo un error al intentar obtener el empleado con el ID: ${id}.` });
    }
}
 exports.createEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  } = req.body;

        let empleado = await empleadoService.createEmpleado({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  });

        return res.status(201).send(empleado);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al crear el evento." })
    }

 }

exports.deleteEmpleado = async (req, res)=>{
    try {
        let id = req.params.id
        let deleteEmpleado = await empleadoService.deleteEmpleado(id)
        if(!deleteEmpleado){
            return res.status(404).send("no existe EL EMPLEADO");
        }
        return res.status(200).send({ mensaje: "El EMPLEADO fue eliminado correctamente." });

    } catch (error) {
        console.log(error)
    }

}

exports.updateEmpleado = (req, res)=>{
    
}