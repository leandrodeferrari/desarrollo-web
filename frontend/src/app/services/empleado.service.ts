import { Injectable } from '@angular/core';
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
        nombre: "Rick",
        apellido: "Sanchez",
        documento: "12345678",
        categoria: "Director Ejecutivo",
        fecha_nacimiento: "26/10/1996",
        email: "ricksanchez@gmail.com",
        modalidad_trabajo: "Presencial",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: false
      },

      {
        id: 2,
        nombre: "María",
        apellido: "Perez",
        documento: "12345678",
        categoria: "Desarrollador",
        fecha_nacimiento: "25/05/1995",
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
        fecha_nacimiento: "25/05/2000",
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
        fecha_nacimiento: "25/05/1960",
        email: "martasanchez@gmail.com",
        modalidad_trabajo: "Mixto",
        hora_entrada: "10:00",
        hora_salida: "17:00",
        activo: false
      }
    ];
  }
  /**
   * @param obtenerTodosLosEmpleados Es un método que permite traer todos los registros de los empleados que se encuentran en la BBDD, aunque por ahora al no existir la mismo oficialmente, dichos datos se traen desde el array "empleados" que se encuentra en el servicio.
   */
  obtenerTodosLosEmpleados(): Empleado[] {
    return this.empleados;
  }

  /**
   * @param btenerEmpleadosPorId Es un método que permite buscar un registro cuando recibe por parámetro un id. Además en caso de que no existe ningún registro que coincida con el id que se pasó por el paramámetro, el mismo devuelve un registro vacío a través del método obtenerEmpleadovacío. 
   */
  
  obtenerEmpleadosPorId(id: number): Empleado {
    const empleado = this.empleados.find(empleado => empleado.id == id);
    return empleado ? empleado : this.obtenerEmpleadoVacio();
  }

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
   * @param btenerEmpleadosPorId Es un método que permite agregar un registro cuando recibe por parámetro objeto de tipo Empleado. 
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
   * @param btenerEmpleadosPorId Es un método que permite agregar un registro cuando recibe por parámetro objeto de tipo Empleado y luego recorre el array de empleados para encontrar el id del empleado que coincida con el id del empleado que se le pasa por parametro al método. 
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

  

}


