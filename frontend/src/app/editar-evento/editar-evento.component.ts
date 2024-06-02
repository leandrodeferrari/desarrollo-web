import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoService } from '../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../interfaces/evento';

@Component({
    selector: 'app-editar-evento',
    standalone: true,
    templateUrl: './editar-evento.component.html',
    styleUrl: './editar-evento.component.css',
    imports: [NavbarComponent, FooterComponent, ReactiveFormsModule]
})
export class EditarEventoComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private fb: FormBuilder = inject(FormBuilder);
    private eventoService: EventoService = inject(EventoService);
    private router: Router = inject(Router);
    private id: number = 0;

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

    ngOnInit(): void {
        this.route.params.subscribe(param => {
            const id: number = +param['id'];
            let eventoEncontrado: Evento = this.eventoService.obtenerPorId(id);

            if (eventoEncontrado) {
                this.evento = eventoEncontrado;
                this.id = id;

                let fechaEnPartes: string[] = eventoEncontrado.fecha.split('/');

                let dia: string = fechaEnPartes[0];
                let mes: string = fechaEnPartes[1];
                let anio: string = `20${fechaEnPartes[2]}`;

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
            let anio: string = fecha.substring(2, 4);
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

    tieneErrores(control: string, error: string): boolean {
        return this.formEditarEvento.get(control)?.hasError(error) && this.formEditarEvento.get(control)?.touched || false;
    }
}
