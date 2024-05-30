import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router) {}

  logout() {
    try {
      setTimeout(() => {
        this.router.navigate(['/login']).catch(e => { console.log('Error:', e); });
      }, 1000);
    }
    catch(e) {
      console.log(e);
    }
  }

  agregarEvento() {
    try {
      this.router.navigate(['/agregar-eventos']).catch(e => { console.log('Error:', e); });
    }
    catch(e) {
      console.log(e);
    }
  }

  verEventos() {
    try {
      this.router.navigate(['/ver-eventos']).catch(e => { console.log('Error:', e); });
    }
    catch(e) {
      console.log(e);
    }
  }

  verEmpleados() {
    try {
      this.router.navigate(['/ver-empleados']).catch(e => { console.log('Error:', e); });
    }
    catch(e) {
      console.log(e);
    }
  }
}
