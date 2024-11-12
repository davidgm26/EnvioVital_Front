import { Routes } from '@angular/router';
import {TarjetaEventoComponent} from "../componentes/tarjeta-evento/tarjeta-evento.component";
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";

export const routes: Routes = [

  {path: 'evento', component:TarjetaEventoComponent,},
  {path: 'almacen', component:AlmacenFormComponent,},

];
