import { Injectable, inject } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http: HttpClient = inject(HttpClient);
  private url = "http://localhost:3000/api/eventos";
  public eventos: Evento[] = [];

  constructor() { }

  /**
  * Obtiene todos los eventos de la base de datos.
  *
  * @return {Observable<Evento[]>} Retorna un Observable con todos los eventos.
  */
  obtenerTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url);
  }

  /**
  * Obtiene un evento a traves de su ID.
  *
  * @param {string} id - El ID del evento que queremos obtener.
  * @return {Observable<Evento>} Retorna un Observable con el evento, con el ID especificado.
  */
  obtenerPorId(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  /**
  * Crea un nuevo evento en la base de datos.
  *
  * @param {Evento} evento - El evento que se quiere crear.
  * @return {Observable<Evento>} Retorna un Observable con el evento creado.
  */
  crear(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.url, evento);
  }

  /**
  * Actualiza un evento en la base de datos, con las propiedades y ID del eventoParaEditar proporcionado.
  *
  * @param {Evento} eventoParaEditar - El evento que contiene los valores de las propiedades que queremos actualizar.
  * @return {Observable<Evento>} Retorna un Observable con el evento editado.
  */
  editar(eventoParaEditar: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.url}/${eventoParaEditar._id}`, eventoParaEditar);
  }

  /**
  * Elimina un evento en la base de datos, a traves de su ID.
  *
  * @param {string} id - El ID del evento que deseamos eliminar.
  * @return {Observable<{ mensaje: string }>} Retorna un Observable con un mensaje respecto a si se elimino o no el evento, con el ID especificado.
  */
  borrar(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.url}/${id}`);
  }
}