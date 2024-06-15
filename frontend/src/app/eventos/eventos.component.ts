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
    this.eventoService.obtenerTodos().subscribe({
      next: response => {
        this.eventos = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  /**
  * Elimina un evento, a traves de su ID, y actualiza la propiedad eventos.
  *
  * @param {string} id - El ID del evento que deseamos eliminar.
  * @return {void}
  */
  borrar(id: string): void {
    this.eventoService.borrar(id).subscribe({
      next: response => {
        if (response.mensaje === "El evento fue eliminado correctamente.") {
          this.eventoService.obtenerTodos().subscribe({
            next: response => {
              this.eventos = response;
            }
          });
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
