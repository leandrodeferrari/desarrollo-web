import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private listadoUsuarios = [
    { nombre: 'Juan', apellido: 'Centurión', email: 'centurion.juan@gmail.com', password: '12345678' },
    { nombre: 'Leandro', apellido: 'Deferrari', email: 'deferrari.leandro@gmail.com', password: '12345678' },
    { nombre: 'Jose', apellido: 'Taretto', email: 'taretto.jose@gmail.com', password: '12345678' },
    { nombre: 'Marinela', apellido: 'Montilla', email: 'montilla.marinela@gmail.com',password: '12345678'}
  ];

  constructor() { }

  /**
   * Este méstodo se utiliza para validar el email y contraseña que ingresa el usuario con el fin de permitir el inicio de sesión en la app.
   * @param {Any} usuario Recibe como parámetro el usuario 
   * 
   */
  login(usuario:any) {
    const login = this.listadoUsuarios.find(
      u => u.email === usuario.email && u.password === usuario.password
    );
    return login ? login : undefined;
  }
}
