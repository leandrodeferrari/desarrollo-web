const empleadoService = require('../service/empleadoService');

/**
 * Este método ejecuta un método del servicio empleadoService para obtener todos los empleados
 * desde la base de datos. Si la operación se ejecuta correctamente, se devuelve una respuesta HTTP 200
 * con los empleados obtenidos. Si ocurre un error, se registra el error en la consola.
 */
exports.readEmpleados = async (req, res) => {
    try {
        let empleados = await empleadoService.getEmpleados();
        return res.status(200).send(empleados);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al intentar obtener todos los empleados." })
    }
}

/** 
 * Este método ejecuta el método del servicio empleadoService para obtener un empleado específico
 * desde la base de datos cuando se le pasa por parametro el ID. En la ejecución de este método se pueden 
 * generar los siguientes esenarios:  
 * -Si el empleado existe, devuelve una respuesta HTTP 200 con el empleado encontrado.
 * 
 * -Si el empleado no existe, devuelve una respuesta HTTP 404 indicando que no se encontró el empleado.
 * 
 * -Si ocurre un error durante la operación, registra el error en la consola y devuelve una respuesta HTTP 500.
 * */
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
/**
 * Este método recibe los datos de un nuevo empleado para pasarlos en el cuerpo de la solicitud HTTP y utiliza
 * el método del servicio empleadoService para crear el empleado en la base de datos. Si la operación es exitosa, 
 * devuelve una respuesta HTTP 201 con el empleado creado.
 */
 exports.createEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  } = req.body;

        let empleado = await empleadoService.createEmpleado({ nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  });

        return res.status(201).send(empleado);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mensaje: "Hubo un error al crear el empleado." })
    }

 }

/**
 * Este método recibe el ID del empleado desde los parámetros de la solicitud 
 * y los datos actualizados del empleado desde el cuerpo de la solicitud. Además, utiliza el método del servicio 
 * empleadoService para actualizar el empleado en la base de datos.
 * Si la operación es exitosa, devuelve una respuesta HTTP 200 indicando que el empleado fue actualizado.
 */
exports.updateEmpleado = async (req, res)=>{
    try{

        let id = req.params.id;
        const { nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo  } = req.body;
        
        let updateEmpleado = await empleadoService.putEmpleados({nombre, apellido, documento, categoria, fecha_nacimiento, email, modalidad_trabajo, hora_entrada, hora_salida, activo },id);
        
        if(!updateEmpleado){
            return res.status(404).send("no existe EL EMPLEADO");
        }
        return res.status(200).send({ mensaje: "El EMPLEADO fue ACTULIZADO correctamente." });
    }
    catch (error) {
        console.log(error)
    }
}

/***
 * Este método recibe el ID del empleado desde los parámetros de la solicitud y
 * utiliza el metodo del servicio empleadoService para eliminar el empleado de la base de datos.
 * Si la operación es exitosa, devuelve una respuesta HTTP 200 indicando que el empleado fue eliminado.
 */
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