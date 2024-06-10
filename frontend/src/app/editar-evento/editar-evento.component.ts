import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoService } from '../services/evento.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Evento } from '../interfaces/evento';

@Component({
    selector: 'app-editar-evento',
    standalone: true,
    templateUrl: './editar-evento.component.html',
    styleUrl: './editar-evento.component.css',
    imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink]
})
export class EditarEventoComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private fb: FormBuilder = inject(FormBuilder);
    private eventoService: EventoService = inject(EventoService);
    private router: Router = inject(Router);
    private id: number = 0;
    public btn_atras: string = "< Ir atrás";
    public formEditarEvento: FormGroup;
    public evento?: Evento;

    constructor() {
        this.formEditarEvento = this.fb.group({
            titulo: ['', [Validators.required]],
            imagenUrl: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            fecha: ['', [Validators.required]],
            horario: ['', [Validators.required]],
            ubicacion: ['', [Validators.required]]
        });
    }

    /**
    * Recupera los datos del evento a partir de los parámetros de la ruta. Si se encuentra el evento, 
    * establece las propiedades del componente y rellena los campos del formulario con los datos del 
    * evento.
    *
    * @return {void}
    */
    ngOnInit(): void {
        this.route.params.subscribe(param => {
            const id: number = param['id'];
            let eventoEncontrado: Evento = this.eventoService.obtenerPorId(id);

            if (eventoEncontrado) {
                this.evento = eventoEncontrado;
                this.id = id;

                let fechaEnPartes: string[] = eventoEncontrado.fecha.split('/');

                let dia: string = fechaEnPartes[0];
                let mes: string = fechaEnPartes[1];
                let anio: string = `${fechaEnPartes[2]}`;

                // Formato "YYYY-MM-DD" para que lo reconozca HTML.
                let fechaConFormato: string = `${anio}-${mes}-${dia}`;

                this.formEditarEvento.get('titulo')?.setValue(eventoEncontrado.titulo);
                this.formEditarEvento.get('imagenUrl')?.setValue(eventoEncontrado.imagenUrl);
                this.formEditarEvento.get('descripcion')?.setValue(eventoEncontrado.descripcion);
                this.formEditarEvento.get('fecha')?.setValue(fechaConFormato);
                this.formEditarEvento.get('horario')?.setValue(eventoEncontrado.horario);
                this.formEditarEvento.get('ubicacion')?.setValue(eventoEncontrado.ubicacion);
            }
        });
    }

    /**
    * Edita un evento actualizando sus propiedades con los valores del formulario y navegando a la 
    * página 'eventos' si el formulario es válido.
    *
    * @param {Event} event - El evento que contiene los valores de las propiedades que queremos 
    * actualizar.
    * 
    * @return {void}
    */
    editar(event: Event): void {
        event.preventDefault();

        if (this.formEditarEvento.valid) {
            let titulo: string = this.formEditarEvento.value.titulo as string;
            let imagenUrl: string = this.formEditarEvento.value.imagenUrl as string;
            let descripcion: string = this.formEditarEvento.value.descripcion as string;
            let fecha: string = this.formEditarEvento.value.fecha as string;
            let horario: string = this.formEditarEvento.value.horario;
            let ubicacion: string = this.formEditarEvento.value.ubicacion;

            let dia: string = fecha.substring(8);
            let mes: string = fecha.substring(5, 7);
            let anio: string = fecha.substring(0, 4);
            let fechaConFormato: string = `${dia}/${mes}/${anio}`;

            let evento: Evento = {
                id: this.id,
                titulo: titulo,
                imagenUrl: imagenUrl,
                descripcion: descripcion,
                fecha: fechaConFormato,
                horario: horario,
                ubicacion: ubicacion
            }

            this.eventoService.editar(evento);

            this.router.navigate(['eventos']);
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
        return this.formEditarEvento.get(control)?.hasError(error) && this.formEditarEvento.get(control)?.touched || false;
    }
}
