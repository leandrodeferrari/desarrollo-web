import { Component, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../interfaces/empleado';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-detalle-de-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './detalle-de-empleado.component.html',
  styleUrl: './detalle-de-empleado.component.css'
})
export class DetalleDeEmpleadoComponent implements OnInit {
  private empleadoService: EmpleadoService = inject (EmpleadoService);
  private _route = inject(ActivatedRoute)
  public empleadoObtenido?: Empleado;
  //Propiedades para el formulario

  nombre: string = '';
  apellido: string= '';
  documento: string = '';
  categoria: string = '';
  fecha_nacimiento: string = '';
  email: string = "";
  modalidadTrabajo: string = "";
  horario: string = "";
  activo: boolean = false;


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
