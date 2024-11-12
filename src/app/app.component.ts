import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";
import {NavbarComponent} from "../componentes/navbar/navbar.component";
import {TarjetaEventoComponent} from "../componentes/tarjeta-evento/tarjeta-evento.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlmacenFormComponent, NavbarComponent, TarjetaEventoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'envioVital-front';
}
