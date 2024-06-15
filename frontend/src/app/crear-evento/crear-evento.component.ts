import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../interfaces/evento';
import { EventoService } from '../services/evento.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-crear-evento',
    standalone: true,
    templateUrl: './crear-evento.component.html',
    styleUrl: './crear-evento.component.css',
    imports: [FooterComponent, NavbarComponent, ReactiveFormsModule, RouterLink]
})
export class CrearEventoComponent {
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private eventoService: EventoService = inject(EventoService);
    public formCrearEvento: FormGroup;
    public btn_atras: string = "< Ir atrás";
    public fechaActual: string;

    constructor() {
        const today = new Date();
        // El método toISOString() me devuelve en este formato la fecha: 2024-06-09T19:58:23.568Z
        // Al hacer el split, me devuelve el primer elemento: 2024-06-09
        this.fechaActual = today.toISOString().split('T')[0];

        this.formCrearEvento = this.fb.group({
            titulo: ['', [Validators.required]],
            imagenUrl: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            fecha: ['', [Validators.required]],
            horarioDesde: ['', [Validators.required]],
            horarioHasta: ['', [Validators.required]],
            ubicacion: ['', [Validators.required]]
        });
    }

    /**
    * Crea un nuevo evento y redirige a la página de eventos si el formulario es válido.
    *
    * @param {Event} event - El objeto del tipo Event que activó el método.
    * @return {void}
    */
    crear(event: Event): void {
        event.preventDefault();

        if (this.formCrearEvento.valid) {
            let titulo: string = this.formCrearEvento.value.titulo as string;
            let imagenUrl: string = this.formCrearEvento.value.imagenUrl as string;
            let descripcion: string = this.formCrearEvento.value.descripcion as string;
            let fecha: string = this.formCrearEvento.value.fecha as string;
            let horarioDesde: string = this.formCrearEvento.value.horarioDesde;
            let horarioHasta: string = this.formCrearEvento.value.horarioHasta;
            let ubicacion: string = this.formCrearEvento.value.ubicacion;

            let dia: string = fecha.substring(8);
            let mes: string = fecha.substring(5, 7);
            let anio: string = fecha.substring(0, 4);
            let fechaConFormato: string = `${dia}/${mes}/${anio}`;

            let evento: Evento = {
                _id: "",
                titulo: titulo,
                imagenUrl: imagenUrl,
                descripcion: descripcion,
                fecha: fechaConFormato,
                horario: `${horarioDesde} - ${horarioHasta}`,
                ubicacion: ubicacion
            }

            this.eventoService.crear(evento).subscribe({
                next: response => {
                    this.router.navigate(['eventos']);
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
        return this.formCrearEvento.get(control)?.hasError(error) && this.formCrearEvento.get(control)?.touched || false;
    }
}
