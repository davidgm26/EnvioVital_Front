import { Routes } from '@angular/router';
import {TarjetaEventoComponent} from "../componentes/tarjeta-evento/tarjeta-evento.component";
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";
import {ListaAlmacenesComponent} from "../componentes/lista-almacenes/lista-almacenes.component";

export const routes: Routes = [

  {path: 'evento', component:TarjetaEventoComponent,},
  {path: 'almacen', component:AlmacenFormComponent,},

  // Intento de path para avergiaur cómo visualizar los componentes de listaAlmacenes según el id del evento.
  //{path: 'almacenes', component: ListaAlmacenesComponent},
  { path: 'lista-almacenes/:eventoId', component: ListaAlmacenesComponent },




];

