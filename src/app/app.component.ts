import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";
import {NavbarComponent} from "../componentes/navbar/navbar.component";
import {TarjetaEventoComponent} from "../componentes/tarjeta-evento/tarjeta-evento.component";
import {TarjetaAlmacenComponent} from "../componentes/tarjeta-almacen/tarjeta-almacen.component";
import {ListaAlmacenesComponent} from "../componentes/lista-almacenes/lista-almacenes.component";
import {ListaEventosComponent} from "../componentes/lista-eventos/lista-eventos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlmacenFormComponent, NavbarComponent, TarjetaEventoComponent, ListaEventosComponent],
  imports: [RouterOutlet, AlmacenFormComponent, NavbarComponent, TarjetaEventoComponent, TarjetaAlmacenComponent, ListaAlmacenesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'envioVital-front';
}
