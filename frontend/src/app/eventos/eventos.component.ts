import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { EventoService } from '../services/evento.service';
import { Evento } from '../interfaces/evento';

@Component({
  selector: 'app-eventos',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  imports: [RouterModule, FooterComponent, NavbarComponent]
})
export class EventosComponent {
  private eventoService = inject(EventoService);
  
  public eventos: Evento[] = this.eventoService.eventos;

  constructor() {
    this.eventos = this.eventoService.obtenerTodos();
  }

  borrar(id: number): void {
    this.eventos = this.eventoService.borrar(id);
  }
}
