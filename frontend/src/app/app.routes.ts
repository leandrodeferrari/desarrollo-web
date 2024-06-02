import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: '/login', pathMatch: 'full' },  //Redirigir a "login" por defecto.
    {path: 'empleados', component: TestComponent}
];
