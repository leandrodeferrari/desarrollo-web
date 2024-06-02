import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { EventoService } from '../services/evento.service';
import { ActivatedRoute } from '@angular/router';

interface Evento {
    id: number;
    titulo: string;
    imagenUrl: string;
    descripcion: string;
    fecha: string;
    horario: string;
    ubicacion?: string;
  }

@Component({
    selector: 'app-evento',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.css',
    imports: [FooterComponent, NavbarComponent]
})
export class EventoComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private eventoService: EventoService = inject(EventoService);

    public evento?: Evento;

    constructor(){}

    ngOnInit(): void {
        this._route.params.subscribe(param => {
            const id: number = param['id'];
            let evento = this.eventoService.obtenerPorId(id);
            
            if (evento) {
                this.evento = evento;
            }
        });
    }
}
