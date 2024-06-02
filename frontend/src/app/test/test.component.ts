import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';
import { Router, RouterModule } from '@angular/router';
import { AgregarEmpleadoComponent } from '../agregar-empleado/agregar-empleado.component';
import { DetalleDeEmpleadoComponent } from '../detalle-de-empleado/detalle-de-empleado.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, AgregarEmpleadoComponent, RouterModule, DetalleDeEmpleadoComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent {

  private empleadoService = inject (EmpleadoService);
  
  public empleados: Empleado[] =  this.empleadoService.empleados;

  constructor() {
    this.empleados = this.empleadoService.obtenerTodosLosEmpleados();
 }

 
}
