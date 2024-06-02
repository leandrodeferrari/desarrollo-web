import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { EventoComponent } from './evento/evento.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path: 'home', component: HomeComponent },
    {path: 'eventos', component: EventosComponent },
    {path: 'editar-evento/:id', component: EditarEventoComponent },
    {path: 'evento/:id', component: EventoComponent },
    {path: 'crear-evento', component: CrearEventoComponent },
    {path: '**', redirectTo: '/login', pathMatch: 'full' },  //Redirigir a "login" por defecto.
];
