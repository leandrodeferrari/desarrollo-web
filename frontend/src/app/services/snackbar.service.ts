import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from '../interfaces/snackbar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() { }

  mensaje(texto: string, configuracion: SnackBarConfig, accion?: string) {
    this.snackBar.open(texto, accion, {
      duration: configuracion.duracion,
      panelClass: configuracion.tipoPanel,
      verticalPosition: 'top'
    });
  }
}
