import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Color } from 'colors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService : AuthService = inject(AuthService)
  private router : Router = inject(Router);
  private formulario : FormBuilder = inject(FormBuilder);
  private snackBarService: SnackBarService = inject(SnackBarService);
  protected formLogin : FormGroup;
  ocultarPassword : boolean = true;
  mensajeLogin: string = "";

  /**
   * 
   */
  constructor() {
    this.formLogin = this.formulario.group({
      email: ['', [Validators.required, Validators.email]], //Valida el formato de correo electrónico.
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]], //Valida que el campo tenga mínimo 8 caracteres y máximo 50.
    });
  }

  /**
   * 
   * @param event 
   */
  login(event: Event) {
    event.preventDefault();

    if(this.formLogin.valid) {
      let email = this.formLogin.value.email as string;
      let password = this.formLogin.value.password as string;

      let usuario = {
        email: email,
        password: password
      }

      const resultado = this.authService.login(usuario);
      console.log("Email usuario: ",resultado?.email);
      console.log("Password: ",resultado?.password);

      if (resultado) {
        this.mensajeLogin = `¡Bienvenido ${resultado.nombre} ${resultado.apellido}!`;
        setTimeout(() => {
          this.snackBarService.mensaje(this.mensajeLogin, {duracion: 5000, tipoPanel: ['snack-bar-accent']}, 'Cerrar');
          this.router.navigate(['/home']);
        }, 0);
      } else {
        this.snackBarService.mensaje('Inicio de sesión fallida', {duracion: 7000, tipoPanel: ['snack-bar-error']}, 'Cerrar');
      }
    }
  }

  /**
   * 
   * @param event 
   */
  cambiarVisibilidad(event: MouseEvent) {
    this.ocultarPassword = !this.ocultarPassword;
    event.stopPropagation();
  }

  /**
   * 
   * @param campo 
   * @returns 
   */
  darMensajeError(campo: string) {
    if (this.formLogin.get(campo)?.hasError('required')) 
      { return '*Este campo es obligatorio.'; } 
    else if (this.formLogin.get(campo)?.hasError('email')) 
      { return '*Email no válido.'; } 
    else if (this.formLogin.get(campo)?.hasError('minlength')) 
      { return '*Mínimo 8 carácteres.'; }
    else if (this.formLogin.get(campo)?.hasError('maxlength')) 
      { return '*Máximo 50 carácteres.'; }
    return '';
  }
}