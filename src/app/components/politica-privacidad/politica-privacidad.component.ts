import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrls: ['./politica-privacidad.component.css']
})
export class PoliticaPrivacidadComponent {
  getCurrentDate(): string {
    return formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }
}
