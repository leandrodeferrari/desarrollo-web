import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }

  ocultar:boolean=true;
  inputTipo:string="password";

  login() {
    this.router.navigate(['/home']);
  }

  ocultarPassword() {
    if(this.ocultar) {
      this.ocultar=false;
      this.inputTipo="";
    }
    else {
      this.ocultar=true;
      this.inputTipo="password";
    }
  }
}
