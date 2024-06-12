import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';
import { EmpleadosComponent } from '../empleados/empleados.component'


@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,ReactiveFormsModule, RouterLink, EmpleadosComponent],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent {
  
  private route: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);
  private empleadoService: EmpleadoService = inject(EmpleadoService);
  private router: Router = inject(Router);
  private id: number = 0;
  public empleadoEditado: FormGroup;
  public empleado?:Empleado;

  // Propiedades del formulario
  btn_atras: string ="< Ir atrás";
  public categorias: string[] = [
    'CEO',
    'Product Owner',
    'Desarrollador',
    'QA',
    'Scrum Master',
    'Analista Funcional',
    'Tech Lead'
  ];

  categoriasFiltradas: string[] = [];

    constructor(){
      this.empleadoEditado = this.fb.group({
        nombre:['', Validators.required],
        apellido: ['', Validators.required],
        documento: ['', Validators.required],
        fecha_nacimiento:  ['', Validators.required],
        categoria:  [this.empleado?.categoria || '', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        modalidad_trabajo: [this.empleado?.modalidad_trabajo || '', Validators.required],
        hora_entrada: ['', Validators.required],
        hora_salida: ['', Validators.required]
    })
    }

      /**
    * Recupera los datos de un empleado a partir de los parámetros de la ruta. Si se encuentra el empleado, establece las propiedades del componente y rellena los campos del formulario con los datos del empleado.
    *
    * @return {void}
    */
    ngOnInit(): void {
      this.route.params.subscribe(param => {
          const id: number = param['id'];
          let empleadoFiltrado: Empleado = this.empleadoService.obtenerEmpleadosPorId(id);

          if (empleadoFiltrado) 
            {
              this.empleado = empleadoFiltrado;
              this.id = id;
              this.empleadoEditado.get('nombre')?.setValue(empleadoFiltrado.nombre);
              this.empleadoEditado.get('apellido')?.setValue(empleadoFiltrado.apellido);
              this.empleadoEditado.get('documento')?.setValue(empleadoFiltrado.documento);
              this.empleadoEditado.get('fecha_nacimiento')?.setValue(empleadoFiltrado.fecha_nacimiento);
              this.empleadoEditado.get('categoria')?.setValue(empleadoFiltrado.categoria);
              this.empleadoEditado.get('email')?.setValue(empleadoFiltrado.email);
              this.empleadoEditado.get('modalidad_trabajo')?.setValue(empleadoFiltrado.modalidad_trabajo);
              this.empleadoEditado.get('hora_entrada')?.setValue(empleadoFiltrado.hora_entrada);
              this.empleadoEditado.get('hora_salida')?.setValue(empleadoFiltrado.hora_salida);
            }
      });
     
      this.filtrarCategorias();
    }
    
    /**
     * Filtra la lista de categorías, eliminando la categoría que coincide con la categoría del empleado (this.empleado?.categoria) y guarda el resultado en categoriasFiltradas.
     */

    filtrarCategorias(): void {
      this.categoriasFiltradas = this.categorias.filter(categoria => categoria !== this.empleado?.categoria);
    }

      /**
    * Edita un empleado actualizando sus propiedades con los valores del formulario y navegando la página de empleados si el formulario es válido.
    *
    * @param {Event} event - El evento que contiene los valores de las propiedades que queremos 
    * actualizar.
    * 
    * @return {void}
    */
    
    editarEmpleado(event: Event): void {
      event.preventDefault();

      if (this.empleadoEditado.valid) {
          let nombre: string = this.empleadoEditado.value.nombre as string;
          let apellido: string = this.empleadoEditado.value.apellido as string;
          let documento: string = this.empleadoEditado.value.documento as string;
          let fecha_nacimiento: string = this.empleadoEditado.value.fecha_nacimiento as string;
          let categoria: string = this.empleadoEditado.value.categoria as string;
          let email: string = this.empleadoEditado.value.email as string;
          let modalidad_trabajo: string = this.empleadoEditado.value.modalidad_trabajo as string;
          let hora_entrada: string = this.empleadoEditado.value.hora_entrada as string;
          let hora_salida: string = this.empleadoEditado.value.hora_salida as string

          let empleado: Empleado = {
              id: this.id,
              nombre: nombre,
              apellido: apellido,
              documento: documento,
              fecha_nacimiento: fecha_nacimiento,
              categoria: categoria,
              email: email,
              modalidad_trabajo: modalidad_trabajo,
              hora_entrada: hora_entrada,
              hora_salida: hora_salida,
              activo: true
          }
          console.log(this.empleadoEditado)
          this.empleadoService.editarEmpleado(empleado);

          this.router.navigate(['empleados']);
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
    return this.empleadoEditado.get(control)?.hasError(error) && this.empleadoEditado.get(control)?.touched || false;
  } 
}
