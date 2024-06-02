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
        nombre: "Rick",
        apellido: "Sanchez",
        documento: 12345678,
        categoria: "inventor",
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso:new Date('1990-01-01'),
        activo: true
      },
      {
        id: 2,
        nombre: "Ana",
        apellido: "Banana",
        documento: 87654321,
        categoria: "Desarrolladora jr",
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso: new Date('1990-01-01'),
        activo: false
      },
      {
        id: 3,
        nombre: "Jose",
        apellido: "Taretto",
        documento: 11223344,
        categoria: "Dev FullStack Node.js 3D + un solo link + MF ",
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso: new Date('1990-01-01'),
        activo: true
      },
      {
        id: 4,
        nombre: "Pepe",
        apellido: "Pateatraseros",
        documento: 11223344,
        categoria: "QA FS AUTOMEISHON",
        fecha_nacimiento: new Date('1990-01-01'),
        fecha_ingreso: new Date('1990-01-01'),
        activo: false
      } 
    ]
  }
}
