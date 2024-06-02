import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent {

  private empleadoService = inject (EmpleadoService);
  private router = inject (Router)
  
  public empleados: Empleado[] = this.empleadoService.empleados;

  editEmpleado(empleadoId:number){
    this.router.navigate(['editar-empleado', empleadoId])
    console.log(empleadoId)
  }

  constructor() {
 }

}
