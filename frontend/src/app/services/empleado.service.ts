import { Injectable, inject } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  private url = 'http://127.0.0.1:3101/api/empleados' // URL Base
  private _httpClient = inject(HttpClient)

  public empleados : Empleado[] = [];

  constructor() {  
  }

  /**
   * Es un método que permite traer todos los registros de los empleados que se encuentran en la BBD
   */
  obtenerTodosLosEmpleados(): Observable <Empleado[]>{
    return this._httpClient.get<Empleado[]>(this.url);
  }

  /**
   *  Es un método que permite buscar un registro cuando recibe por parámetro un id. Además en caso de que no exista ningún registro que coincida con el id que se pasó por el paramámetro, el mismo devuelve un registro vacío a través del método obtenerEmpleadovacío. 
   * @param {string} id - Recibe como parámetro un id
   * @returns {Empleado} - Retorna el empleado cuyo id coincida con el id que se le pasó por parámetro o un empleado con valores por defecto en la propiedades.
   * 
   */
  
 obtenerEmpleadosPorId(id: string): Observable <Empleado> {
    //const empleado = this.empleados.find(empleado => empleado._id == id);
    return this._httpClient.get<Empleado>(`${this.url}/${id}`);
  } 

  /**
   * Es un método que permite agregar un registro cuando recibe por parámetro un objeto de tipo Empleado. 
   * @param {Empleado} empleado - Recibe por parámetro un empleado que se agregará en el array empleados.
   * @returns {Empleado} - Retorna el empleado creado
   */


  agregarNuevoEmpleado(empleado: Empleado): Observable <Empleado>{
    return this._httpClient.post<Empleado>(`${this.url}`, empleado); 
  }

  /**
   * Es un método que permite modificar un empleado cuando recibe por parámetro un objeto de tipo Empleado. Luego recorre el array de empleados para encontrar el id del empleado que coincida con el id del empleado que se le pasa por parametro al método y le asigna los nuevos valores. 
   * @param {Empleado} empleadomodificado Recibe el empleado con los datos modificados.
   */
  editarEmpleado(empleado: Empleado): Observable <Empleado> {
    return this._httpClient.put<Empleado>(`${this.url}/${empleado._id}`, empleado)
  } 

   /**
  * Elimina un empleado del array empleados que coincida con el id que se le pasó por parámetro.
  * @param {number} id Es el id del empleado que se quiere eliminar.
  * 
  */
 eliminarEmpleado(id: string): Observable <Empleado> {
      return this._httpClient.delete<Empleado>(`${this.url}/${id}`);
  }
} 