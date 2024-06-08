import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { EventoService } from '../services/evento.service';
import { Evento } from '../interfaces/evento';

@Component({
  selector: 'app-eventos',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  imports: [RouterLink, FooterComponent, NavbarComponent]
})
export class EventosComponent implements OnInit {
  private eventoService = inject(EventoService);
  public eventos: Evento[] = [];

  /**
  * Obtiene todos los eventos a traves del servicio y se lo asgina a la propiedad eventos.
  *
  * @return {void}
  */
  ngOnInit(): void {
    this.eventos = this.eventoService.obtenerTodos();
  }

  /**
  * Elimina un evento de la lista de eventos, a traves de su ID, y actualiza el array de todos los eventos.
  *
  * @param {number} id - El ID del evento que deseamos eliminar.
  * @return {void}
  */
  borrar(id: number): void {
    this.eventos = this.eventoService.borrar(id);
  }
}
