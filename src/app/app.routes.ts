import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlmacenFormComponent } from './components/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from './components/almacen-view/almacen-view.component';
import { ConductorFormComponent } from './components/conductor-form/conductor-form.component';
import { ConductorViewComponent } from './components/conductor-view/conductor-view.component';
import { RegistroAlmacenComponent } from './components/registro-almacen/registro-almacen.component';
import { RegistroConductorComponent } from './components/registro-conductor/registro-conductor.component';
import { TarjetaEventoComponent } from './components/tarjeta-evento/tarjeta-evento.component';
import { ListaAlmacenesComponent } from './components/lista-almacenes/lista-almacenes.component';
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { ListaEventosAlmacenComponent } from './components/lista-eventos-almacen/lista-eventos-almacen.component';

export const routes: Routes = [
    {path: "", redirectTo: "main", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    { path: "almacen/:id", component: AlmacenFormComponent },
    { path: "almacen-view/:id", component: AlmacenViewComponent },
    { path: "conductor/:id", component: ConductorFormComponent },
    { path: "conductor-view/:id", component: ConductorViewComponent },
    { path: "registro/almacen", component: RegistroAlmacenComponent },
    { path: "registro/conductor", component: RegistroConductorComponent },
    { path: 'evento/:id', component:TarjetaEventoComponent,},
    { path: 'almacen', component:AlmacenFormComponent},
    { path: 'eventos', component:ListaEventosAlmacenComponent},
    { path: 'lista-almacenes/:eventoId', component: ListaAlmacenesComponent},
    { path: 'main', component: ListaEventosComponent }

  ];

