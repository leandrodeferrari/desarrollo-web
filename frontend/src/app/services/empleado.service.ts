import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  public empleados : Empleado[];

  constructor() { 
    
    this.empleados =[
      {  
        id: 1,
        nombre: "Luis",
        apellido: "Martínez",
        documento: 12345678,
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso:new Date('1990-01-01'),
        activo: true
      },
      {
        id: 2,
        nombre: "Ana",
        apellido: "González",
        documento: 87654321,
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso: new Date('1990-01-01'),
        activo: false
      },
      {
        id: 3,
        nombre: "Carlos",
        apellido: "Rodríguez",
        documento: 11223344,
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso: new Date('1990-01-01'),
        activo: true
      } 
    ]
  }
}
