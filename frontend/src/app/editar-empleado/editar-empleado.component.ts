import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,ReactiveFormsModule, RouterLink],
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

    ngOnInit(): void {
      this.route.params.subscribe(param => {
          const id: number = param['id'];
          let empleadoFiltrado: Empleado = this.empleadoService.obtenerEmpleadosPorId(id);

          if (empleadoFiltrado) {
              this.empleado = empleadoFiltrado;
              this.id = id;

              let fechaEnPartes: string[] = empleadoFiltrado.fecha_nacimiento.split('/');

              let dia: string = fechaEnPartes[0];
              let mes: string = fechaEnPartes[1];
              let anio: string = `${fechaEnPartes[2]}`;

              // Formato "YYYY-MM-DD" para que lo reconozca HTML.
              let fechaConFormato: string = `${anio}-${mes}-${dia}`;

              this.empleadoEditado.get('nombre')?.setValue(empleadoFiltrado.nombre);
              this.empleadoEditado.get('apellido')?.setValue(empleadoFiltrado.apellido);
              this.empleadoEditado.get('documento')?.setValue(empleadoFiltrado.documento);
              this.empleadoEditado.get('fecha_nacimiento')?.setValue(fechaConFormato);
              this.empleadoEditado.get('categoria')?.setValue(empleadoFiltrado.categoria);
              this.empleadoEditado.get('email')?.setValue(empleadoFiltrado.email);
              this.empleadoEditado.get('modalidad_trabajo')?.setValue(empleadoFiltrado.modalidad_trabajo);
              this.empleadoEditado.get('hora_entrada')?.setValue(empleadoFiltrado.hora_entrada);
              this.empleadoEditado.get('hora_salida')?.setValue(empleadoFiltrado.hora_salida);
          }
      });

      this.filtrarCategorias();
    }

    filtrarCategorias(): void {
      this.categoriasFiltradas = this.categorias.filter(categoria => categoria !== this.empleado?.categoria);
    }
    
    editarEmpleado(event: Event): void {
      event.preventDefault();

      if (this.empleadoEditado.valid) {
          let nombre: string = this.empleadoEditado.value.nombre as string;
          let apellido: string = this.empleadoEditado.value.apellido as string;
          let documento: string = this.empleadoEditado.value.documento as string;
          let fecha_nacimiento: string = this.empleadoEditado.value.fecha_nacimiento as string;
          let categoria: string = this.empleadoEditado.value.categoria as string;
          let email: string = this.empleadoEditado.value.ubicacion as string;
          let modalidad_trabajo: string = this.empleadoEditado.value.modalidad_trabajo as string;
          let hora_entrada: string = this.empleadoEditado.value.hora_entrada as string;
          let hora_salida: string = this.empleadoEditado.value.hora_salida as string

          let dia: string = fecha_nacimiento.substring(8);
          let mes: string = fecha_nacimiento.substring(5, 7);
          let anio: string = fecha_nacimiento.substring(2, 4);
          let fechaConFormato: string = `${dia}/${mes}/${anio}`;

          let empleado: Empleado = {
              id: this.id,
              nombre: nombre,
              apellido: apellido,
              documento: documento,
              fecha_nacimiento: fechaConFormato,
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

  tieneErrores(control: string, error: string): boolean {
    return this.empleadoEditado.get(control)?.hasError(error) && this.empleadoEditado.get(control)?.touched || false;
  } 
}
