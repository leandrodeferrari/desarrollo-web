import { Component, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Empleado } from '../interfaces/empleado';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-detalle-de-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
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
  


  ngOnInit(): void {

    this._route.params.subscribe(param => {
      const id: number = param['id'];
      let empleado = this.empleadoService.obtenerEmpleadosPorId(id);
      
      if (empleado) {
          this.empleadoObtenido = empleado;
      }
  });
  }  
}
