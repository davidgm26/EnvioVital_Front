import { Injectable } from '@angular/core';
import { Alerta } from '../interfaces/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerta: Alerta | null = null;

  setAlert(alerta: Alerta) {
    this.alerta = alerta;
  }

  getAlert(): Alerta | null {
    const alerta = this.alerta;
    this.alerta = null; // Clear the alert after retrieving
    return alerta;
  }
}
