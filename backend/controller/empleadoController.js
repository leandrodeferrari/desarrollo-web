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