import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegistroAlmacenComponent} from "../componentes/registro-almacen/registro-almacen.component";
import {RegistroConductorComponent} from "../componentes/registro-conductor/registro-conductor.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroAlmacenComponent, RegistroConductorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'envioVital-front';

  }


