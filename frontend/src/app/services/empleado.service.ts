import { Injectable, inject } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  private url = 'http://127.0.0.1:3000/api/empleados' // URL Base
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
   *  Es un método que permite buscar un registro cuando recibe por parámetro un id.
   * @param {string} id - Recibe como parámetro un id
   * @returns {Empleado} - Retorna un observable de tipo empleado cuyo id coincida con el id que se le pasó por parámetro.
   * 
   */
  
 obtenerEmpleadosPorId(id: string): Observable <Empleado> {
    return this._httpClient.get<Empleado>(`${this.url}/${id}`);
  } 

  /**
   * Es un método que permite agregar un registro cuando recibe por parámetro un objeto de tipo Empleado. 
   * @param {Empleado} empleado - Recibe por parámetro un empleado.
   * @returns {Empleado} - Retorna un obervable de tipo empleado.
   */


  agregarNuevoEmpleado(empleado: Empleado): Observable <Empleado>{
    return this._httpClient.post<Empleado>(`${this.url}`, empleado); 
  }

  /**
   * Es un método que permite modificar un empleado cuando recibe por parámetro un objeto de tipo Empleado.
   * @param {Empleado} empleadomodificado Recibe el empleado con los datos modificados.
   */
  editarEmpleado(empleado: Empleado): Observable <Empleado> {
    return this._httpClient.put<Empleado>(`${this.url}/${empleado._id}`, empleado)
  } 

   /**
  * Elimina un empleado coincida con el id que se le pasó por parámetro.
  * @param {string} id Es el id del empleado que se quiere eliminar.
  * 
  */
 eliminarEmpleado(id: string): Observable <Empleado> {
      return this._httpClient.delete<Empleado>(`${this.url}/${id}`);
  }
} 