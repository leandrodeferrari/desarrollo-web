import { Component, inject } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component'
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Empleado } from '../interfaces/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { TestComponent } from '../test/test.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-empleado',
    standalone: true,
    templateUrl: './edit-empleado.component.html',
    styleUrl: './edit-empleado.component.css',
    imports: [NavbarComponent,RouterLink, FooterComponent, FormsModule, TestComponent]
})

export class EditEmpleadoComponent {
    
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

    guardad(empleado : Empleado) {
        this.empleadoService.editarEmpleado(empleado)
    }

}
