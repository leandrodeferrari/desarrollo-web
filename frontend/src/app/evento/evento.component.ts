import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { EventoService } from '../services/evento.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../interfaces/evento';

@Component({
    selector: 'app-evento',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.css',
    imports: [FooterComponent, NavbarComponent, RouterLink]
})
export class EventoComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private eventoService: EventoService = inject(EventoService);
    public evento?: Evento;
    public btn_atras: string = "< Ir atrás";

    constructor(){}

    /**
    * Recupera el ID a traves deL parámetro de la URL y busca la información del evento con el 
    * método del servicio. Si se encuentra el evento, se asigna a la propiedad evento.
    *
    * @return {void}
    */
    ngOnInit(): void {
        this.route.params.subscribe(param => {
            const id: number = param['id'];
            let evento = this.eventoService.obtenerPorId(id);
            
            if (evento) {
                this.evento = evento;
            }
        });
    }
}
