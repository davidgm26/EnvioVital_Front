import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlmacenFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'envioVital-front';
}
