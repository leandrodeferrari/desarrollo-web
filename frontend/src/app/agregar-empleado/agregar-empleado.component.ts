import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';

@Component({
  selector: 'app-agregar-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})

export class AgregarEmpleadoComponent{
  private router: Router = inject(Router);
  private empleadoService: EmpleadoService = inject(EmpleadoService); 
  public nuevoEmpleado: FormGroup;
  btn_atras: string ="< Ir atrás";// Propiedad para el formulario

  constructor(private fb:FormBuilder){
    this.nuevoEmpleado = this.fb.group({
      nombre:['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      fecha_nacimiento:  ['', Validators.required],
      categoria:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      modalidad_trabajo: ['Presencial', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required]
      
    })
  }

  
    /**
    * Crea un nuevo empleado y redirige a la página de empleados si el formulario es válido.
    *
    * @param {Event} event - El objeto del tipo Event que activó el método.
    * @return {void}
    */

  crear(event: Event): void {
    event.preventDefault();

    if (this.nuevoEmpleado.valid) {
        let nombre: string = this.nuevoEmpleado.value.nombre as string;
        let apellido: string = this.nuevoEmpleado.value.apellido as string;
        let documento: string = this.nuevoEmpleado.value.documento as string;
        let fecha_nacimiento: string = this.nuevoEmpleado.value.fecha_nacimiento as string;
        let categoria: string = this.nuevoEmpleado.value.categoria as string;
        let email: string = this.nuevoEmpleado.value.email as string;
        let modalidad_trabajo: string = this.nuevoEmpleado.value.modalidad_trabajo as string;
        let hora_entrada: string = this.nuevoEmpleado.value.hora_entrada as string;
        let hora_salida: string = this.nuevoEmpleado.value.hora_salida as string;
        
        let empleado: Empleado = {
            _id: "",
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            categoria: categoria,
            fecha_nacimiento: fecha_nacimiento,
            email: email,
            modalidad_trabajo: modalidad_trabajo,
            hora_entrada: hora_entrada,
            hora_salida: hora_salida,
            activo: true
          }

        this.empleadoService.agregarNuevoEmpleado(empleado).subscribe({
          next: response => {
            this.router.navigate(['empleados'])
          },
          error: error => {
            console.log(error);
          }
        });
       
      }
    }

   /**
    * Comprueba si un control dado del formulario tiene un error específico y ha sido tocado.
    *
    * @param {string} control - El nombre del control a comprobar.
    * @param {string} error - El nombre del error a comprobar.
    * @return {boolean} Devuelve true si el control tiene el error especificado y ha sido tocado, sino false.
    */
   
  tieneErrores(control: string, error: string): boolean {
    return this.nuevoEmpleado.get(control)?.hasError(error) && this.nuevoEmpleado.get(control)?.touched || false;
  } 
}
