import { Component, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Empleado } from '../interfaces/empleado';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EventoComponent } from '../evento/evento.component';

@Component({
  selector: 'app-detalle-de-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, EventoComponent],
  templateUrl: './detalle-de-empleado.component.html',
  styleUrl: './detalle-de-empleado.component.css'
})

export class DetalleDeEmpleadoComponent implements OnInit {
  private empleadoService: EmpleadoService = inject (EmpleadoService);
  private _route = inject(ActivatedRoute)
  public empleadoObtenido?: Empleado;
  
  //Propiedades para el formulario
  empleado_activo: string = 'El empleado actualmente está activo en la compañía.';
  empleado_inactivo: string = 'El empleado actualmente no está activo en la compañía.';
  btn_atras: string ="< Ir atrás";
  
 /**
    * A través del parámetro de la URL obtiene el id del empleado y busca la información del empleado con el método del servicio. Si se encuentra el empleado, se asigna a la propiedad empleado.
    *
    * @return {void}
    */
  ngOnInit(): void {
    this._route.params.subscribe({
      next: params =>{
        this.empleadoService.obtenerEmpleadosPorId(params['id']).subscribe({
          next: data => {
            this.empleadoObtenido = data 
          }, error: error =>{
            console.log(error)
          }
        })
      }, error: error => {
        console.log(error)
      }
    });
  }  
}
