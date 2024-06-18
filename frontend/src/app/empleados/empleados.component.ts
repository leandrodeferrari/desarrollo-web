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

export class EmpleadosComponent implements OnInit{
  private empleadoService = inject (EmpleadoService);
  public empleados: Empleado[] =  [];   
  ngOnInit(): void {

    this.empleadoService.obtenerTodosLosEmpleados().subscribe({
      next: data => {
        this.empleados = data;
      }, error: error =>{
        console.log(error)
      }
    });
  }

  constructor() {
 }
 /**
  * Confirma la acción de eliminar un empleado. En caso de que la acción sea requerida, se llama al método eliminarEmpleado, el cual recibe el id del empleado en cuestión, para eliminarlo del array empleados
  */
 borrar(id: string): void {

    if (confirm("¿Estás seguro de que quieres eliminar este empleado?")){
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: response => {
          if(response){
            this.empleadoService.obtenerTodosLosEmpleados().subscribe({
              next: response => {
                this.empleados = response
              }
            });
          }
        },
        error: error => {
          console.log(error);
        }
      })
    }

  }
}
