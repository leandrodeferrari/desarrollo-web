import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Color } from 'colors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    RouterModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService : AuthService = inject(AuthService)
  private router : Router = inject(Router);
  private formulario : FormBuilder = inject(FormBuilder);
  protected formLogin : FormGroup;
  ocultarPassword : boolean = true;
  auth? : boolean;
  usuarioLogin?: any;

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
      console.log('Usuario:\n\n'.bgGreen+resultado);
      if (resultado) {
        this.auth = true;
        this.usuarioLogin = resultado;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      } else {
        this.auth = false;
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