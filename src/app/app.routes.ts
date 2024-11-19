import { Routes } from '@angular/router';
import {TarjetaEventoComponent} from "../componentes/tarjeta-evento/tarjeta-evento.component";
import {AlmacenFormComponent} from "../componentes/almacen-form/almacen-form.component";
import {ListaEventosComponent} from "../componentes/lista-eventos/lista-eventos.component";

export const routes: Routes = [

  {path: 'evento/:id', component:TarjetaEventoComponent,},
  {path: 'almacen', component:AlmacenFormComponent,},
  {path: 'eventos', component:ListaEventosComponent,},

  // Intento de path para avergiaur cómo visualizar los componentes de listaAlmacenes según el id del evento.
  //{path: 'almacenes', component: ListaAlmacenesComponent},
  { path: 'lista-almacenes/:eventoId', component: ListaAlmacenesComponent },




];
