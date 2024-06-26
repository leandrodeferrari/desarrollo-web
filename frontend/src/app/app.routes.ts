import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { EventoComponent } from './evento/evento.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { DetalleDeEmpleadoComponent } from './detalle-de-empleado/detalle-de-empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'home', component: HomeComponent },
    {path: 'eventos', component: EventosComponent },
    {path: 'editar-evento/:id', component: EditarEventoComponent },
    {path: 'eventos/:id', component: EventoComponent },
    {path: 'crear-evento', component: CrearEventoComponent },
    {path: 'empleados', component: EmpleadosComponent },
    {path: 'editar-empleado/:id', component:EditarEmpleadoComponent },
    {path: 'agregar-empleado', component: AgregarEmpleadoComponent},
    {path: 'empleados/:id', component: DetalleDeEmpleadoComponent},
    {path: '**', redirectTo: '/login', pathMatch: 'full' },  //Redirigir a "login" por defecto.
];
