import { Injectable, inject } from '@angular/core';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  public empleados : Empleado[];

  constructor() { 
    
    this.empleados =[
      {  
        id: 1,
        nombre: "Rick Manuel",
        apellido: "Sanchez Urdaneta",
        documento: "12345678",
        categoria: "Director Ejecutivo",
        fecha_nacimiento: "1996-07-02",
        email: "ricksanchez@gmail.com",
        modalidad_trabajo: "Presencial",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: false
      },

      {
        id: 2,
        nombre: "María Alejandra",
        apellido: "Perez Gonzales",
        documento: "12345678",
        categoria: "Desarrollador",
        fecha_nacimiento: "2000-02-12",
        email: "mariaperez@gmail.com",
        modalidad_trabajo: "Remoto",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: true
      },
      {
        id: 3,
        nombre: "José",
        apellido: "Hernandez",
        documento: "12345678",
        categoria: "QA",
        fecha_nacimiento: "2020-07-02",
        email: "josehernadez@gmail.com",
        modalidad_trabajo: "Presencial",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: true
      },
      {
        id: 4,
        nombre: "Marta",
        apellido: "Sanchez",
        documento: "12345678",
        categoria: "Arquitecto",
        fecha_nacimiento: "2020-07-02",
        email: "martasanchez@gmail.com",
        modalidad_trabajo: "Mixto",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: false
      }
    ];
  }

  /**
   * Es un método que permite traer todos los registros de los empleados que se encuentran en la BBDD, aunque por ahora al no existir oficialmente una BBDD, dichos datos se traen desde el array "empleados" que se encuentra en el servicio.
   */
  obtenerTodosLosEmpleados(): Empleado[]{
    return this.empleados;
  }

  /**
   *  Es un método que permite buscar un registro cuando recibe por parámetro un id. Además en caso de que no exista ningún registro que coincida con el id que se pasó por el paramámetro, el mismo devuelve un registro vacío a través del método obtenerEmpleadovacío. 
   * @param {number} id - Recibe como parámetro un id
   * @returns {Empleado} - Retorna el empleado cuyo id coincida con el id que se le pasó por parámetro o un empleado con valores por defecto en la propiedades.
   * 
   */
  
  obtenerEmpleadosPorId(id: number): Empleado {
    const empleado = this.empleados.find(empleado => empleado.id == id);
    return empleado ? empleado : this.obtenerEmpleadoVacio();
  }
  /**
  * Obtiene un empleado con valores por defecto en las propiedades.
  *
  * @return {Empleado} Retorna un empleado con valores por defecto en las propiedades.
  */
  obtenerEmpleadoVacio(): Empleado {
    return {
      id: 0,
      nombre: "",
      apellido: "",
      documento: "",
      categoria:"",
      fecha_nacimiento: "",
      email: "",
      modalidad_trabajo: "",
      hora_entrada: "",
      hora_salida: "",
      activo: false
    };
  }

  /**
   * Es un método que permite agregar un registro cuando recibe por parámetro un objeto de tipo Empleado. 
   * @param {Empleado} empleado - Recibe por parámetro un empleado que se agregará en el array empleados.
   * @returns {Empleado} - Retorna el empleado creado
   */

  agregarNuevoEmpleado(empleado: Empleado){
    let id: number = this.empleados.length + 1;

    let nuevoEmpleado: Empleado = {
      id: id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      documento: empleado.documento,
      categoria: empleado.categoria,
      fecha_nacimiento: empleado.fecha_nacimiento,
      email: empleado.email,
      modalidad_trabajo: empleado.modalidad_trabajo,
      hora_entrada: empleado.hora_entrada,
      hora_salida: empleado.hora_salida,
      activo: empleado.activo
    }

    this.empleados.push(nuevoEmpleado);

    return nuevoEmpleado;
  }

  /**
   * Es un método que permite modificar un empleado cuando recibe por parámetro un objeto de tipo Empleado. Luego recorre el array de empleados para encontrar el id del empleado que coincida con el id del empleado que se le pasa por parametro al método y le asigna los nuevos valores. 
   * @param {Empleado} empleadomodificado Recibe el empleado con los datos modificados.
   */
  editarEmpleado(empleadomodificado: Empleado): void {
    
    this.empleados.forEach(empleado => {
      if (empleado.id == empleadomodificado.id) {
        empleado.nombre = empleadomodificado.nombre;
        empleado.apellido = empleadomodificado.apellido;
        empleado.documento = empleadomodificado.documento;
        empleado.categoria = empleadomodificado.categoria;
        empleado.fecha_nacimiento = empleadomodificado.fecha_nacimiento;
        empleado.email = empleadomodificado.email;
        empleado.modalidad_trabajo = empleadomodificado.modalidad_trabajo;
        empleado.hora_entrada = empleadomodificado.hora_entrada;
        empleado.hora_salida = empleadomodificado.hora_salida;
        empleado.activo = empleadomodificado.activo
      }
    });
  }

   /**
  * Elimina un empleado del array empleados que coincida con el id que se le pasó por parámetro.
  * @param {number} id Es el id del empleado que se quiere eliminar.
  * 
  */
  eliminarEmpleado(id: number): Empleado[] {
      this.empleados = this.empleados.filter(empleado => empleado.id !== id);

      console.log(this.empleados)
      return this.empleados;
  }
}