import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private url = "http://localhost:3000/api/usuarios";

  constructor() { }

  /**
   * 
   * @param usuario : Objeto "usuario" con sus credenciales (email, password).
   * @returns : devuelve la respuesta del POST al servidor con el objeto "usuario".
   */
  login(usuario: any): Observable<any> {
    return this.http.post<any>(this.url, usuario).pipe(
      catchError(this.verificarErrores)
    );
  }

  /**
   * Verifica si ocurren errores al recibir los paquetes HTTP.
   * @param http : paquete HTTP enviado desde el servidor.
   * @returns : devuelve un mensaje notificando el error.
   */
  private verificarErrores(http: HttpErrorResponse) {
    let mensajeError = 'Error desconocido.'; //Sino logra 
    if (http.error instanceof ErrorEvent) {
      mensajeError = `Error en el front: ${http.error.message}`;
    } else {
      mensajeError = `Error en el back:\nCódigo: ${http.status}\nMensaje: ${http.message}`;
    }
    return throwError(() => new Error(mensajeError));
  }
}
