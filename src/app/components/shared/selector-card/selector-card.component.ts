import { Component, Input } from '@angular/core';
import { Rol } from '../../../interfaces/rol';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './selector-card.component.html',
  styleUrls: ['./selector-card.component.css']
})
export class SelectorCardComponent {

  @Input() rol!: Rol;
  @Input() id: number = 0;

  constructor(
    private router: Router,
  ) { }

  registro(rol: string) {
    rol === 'Conductor' ? this.router.navigate(['/registro/conductor']) : this.router.navigate(['/registro/almacen']);
  }

}
