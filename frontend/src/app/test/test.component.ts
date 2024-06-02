import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../interfaces/empleado';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent {

  private empleadoService = inject (EmpleadoService);
  
  public empleados: Empleado[] = this.empleadoService.empleados;

  constructor() {
 }

}
