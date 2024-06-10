import { Injectable } from '@angular/core';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public eventos: Evento[];

  constructor() {
    this.eventos = [
      {
        id: 1,
        titulo: "Networking Empresarial en Buenos Aires",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717251837/_f475cc6f-41a3-44da-ab0b-9e498bb20efd_mlzpw4.jpg",
        descripcion: "Un evento exclusivo para empresarios y emprendedores con el objetivo de establecer conexiones estratégicas y compartir experiencias de negocios. Habrá rondas de networking, presentaciones y un cóctel al final del evento.",
        fecha: "25/09/2024",
        horario: "18:00 - 21:00",
        ubicacion: "Caballito"
      },
      {
        id: 2,
        titulo: "Cumbre de Líderes Empresariales",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717281378/_10774ca8-df16-4055-8ea6-d12a151dc7c6_xort5w.jpg",
        descripcion: "Encuentro privado para líderes de empresas argentinas con el propósito de debatir sobre estrategias de crecimiento, liderazgo y responsabilidad social empresarial. Incluye paneles de discusión y sesiones de trabajo en grupo.",
        fecha: "15/08/2024",
        horario: "10:00 - 16:00",
        ubicacion: "Caballito"
      },
      {
        id: 3,
        titulo: "Jornada de Marketing Digital",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717281494/_3378ce39-8978-41f1-b518-95c828836806_uw8utr.jpg",
        descripcion: "Un día dedicado a explorar las mejores prácticas y nuevas tendencias en marketing digital. El evento contará con expertos en el campo que compartirán sus conocimientos a través de charlas y talleres interactivos.",
        fecha: "12/09/2024",
        horario: "08:30 - 15:30",
        ubicacion: "Caballito"
      },
      {
        id: 4,
        titulo: "Seminario de Estrategias Financieras para PYMES",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717281609/_1e0bdca6-5690-4e82-affc-de882c0b220b_dy8r7z.jpg",
        descripcion: "Un seminario diseñado para dueños y gerentes de pequeñas y medianas empresas (PYMES), enfocado en estrategias financieras para optimizar la gestión de recursos, aumentar la rentabilidad y asegurar el crecimiento sostenible.",
        fecha: "20/10/2024",
        horario: "09:00 - 14:00",
        ubicacion: "Caballito"
      },
      {
        id: 5,
        titulo: "Taller de Transformación Digital para Empresas",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717281610/_6afcd2a0-7132-4cf7-a0a9-6bb57db05f3f_r1mubl.jpg",
        descripcion: "Un taller intensivo, realizado por referentes en la industria, que abordará cómo las empresas pueden implementar estrategias de transformación digital para mejorar su competitividad y eficiencia. Incluye sesiones prácticas y casos de estudio reales.",
        fecha: "12/11/2024",
        horario: "09:30 - 16:30",
        ubicacion: "Caballito"
      },
      {
        id: 6,
        titulo: "Conferencia sobre Sostenibilidad Corporativa",
        imagenUrl: "https://res.cloudinary.com/dy7gwan0n/image/upload/v1717281494/_7b9e275e-e10d-4a7a-9a8d-7b3d72a2c9bd_cvsl6y.jpg",
        descripcion: "Una conferencia dedicada a explorar cómo las empresas pueden integrar prácticas sostenibles en su modelo de negocio. Habrá paneles de expertos, presentaciones de casos de éxito y oportunidades para networking.",
        fecha: "05/12/2024",
        horario: "10:00 - 17:00",
        ubicacion: "Caballito"
      }
    ];
  }

  /**
  * Obtiene todos los eventos.
  *
  * @return {Evento[]} Retorna una array con todos los eventos.
  */
  obtenerTodos(): Evento[] {
    return this.eventos;
  }

  /**
  * Obtiene un evento a traves de su ID.
  *
  * @param {number} id - El ID del evento que queremos obtener.
  * @return {Evento} Retorna el evento con el ID especificado o un evento vacío si no lo encuentra.
  */
  obtenerPorId(id: number): Evento {
    const evento = this.eventos.find(evento => evento.id == id);

    return evento ? evento : this.obtenerEventoVacio();
  }

  /**
  * Obtiene un evento con valores por defecto en las propiedades.
  *
  * @return {Evento} Retorna un evento con valores por defecto en las propiedades.
  */
  private obtenerEventoVacio(): Evento {
    return {
      id: 0,
      titulo: "",
      imagenUrl: "",
      descripcion: "",
      fecha: "",
      horario: "",
      ubicacion: ""
    };
  }

  /**
  * Crea un nuevo evento y lo agrega al array de todos los eventos.
  *
  * @param {Evento} evento - El evento que se quiere crear.
  * @return {Evento} Retorna el evento creado.
  */
  crear(evento: Evento): Evento {
    let id: number = this.eventos.length + 1;

    let eventoCreado: Evento = {
      id: id,
      titulo: evento.titulo,
      imagenUrl: evento.imagenUrl,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      horario: evento.horario,
      ubicacion: evento.ubicacion
    }

    this.eventos.push(eventoCreado);

    return eventoCreado;
  }

  /**
  * Actualiza un evento en la lista de eventos con las propiedades y ID del eventoParaEditar proporcionado.
  *
  * @param {Evento} eventoParaEditar - El evento que contiene los valores de las propiedades que queremos actualizar.
  * @return {void}
  */
  editar(eventoParaEditar: Evento): void {
    this.eventos.forEach(evento => {
      if (evento.id == eventoParaEditar.id) {
        evento.titulo = eventoParaEditar.titulo;
        evento.imagenUrl = eventoParaEditar.imagenUrl;
        evento.descripcion = eventoParaEditar.descripcion;
        evento.fecha = eventoParaEditar.fecha;
        evento.horario = eventoParaEditar.horario;
        evento.ubicacion = eventoParaEditar.ubicacion;
      }
    });
  }

  /**
  * Elimina un evento de la lista de eventos, a traves de su ID, y actualiza el array de todos los eventos.
  *
  * @param {number} id - El ID del evento que deseamos eliminar.
  * @return {Evento[]} Retorna la lista de eventos sin el evento eliminado.
  */
 
  borrar(id: number): Evento[] {
    this.eventos = this.eventos.filter(evento => evento.id !== id);

    return this.eventos;
  }
}