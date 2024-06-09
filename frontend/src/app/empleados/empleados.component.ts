import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';
import { RouterModule } from '@angular/router';
import { AgregarEmpleadoComponent } from '../agregar-empleado/agregar-empleado.component';
import { DetalleDeEmpleadoComponent } from '../detalle-de-empleado/detalle-de-empleado.component';
import { EditarEmpleadoComponent } from '../editar-empleado/editar-empleado.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, AgregarEmpleadoComponent, RouterModule, DetalleDeEmpleadoComponent, EditarEmpleadoComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {


  private empleadoService = inject (EmpleadoService);
  
  public empleados: Empleado[] =  this.empleadoService.empleados;


  constructor() {
    this.empleados = this.empleadoService.obtenerTodosLosEmpleados();
 }
 borrar(id: number): void {
    this.empleados = this.empleadoService.eliminarEmpleado(id);
  }

}
