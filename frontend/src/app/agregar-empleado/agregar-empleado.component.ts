import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-empleado',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent {

 

}
