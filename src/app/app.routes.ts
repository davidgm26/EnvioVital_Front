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
import { SelectorRolComponent } from './components/selector-rol/selector-rol.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '', 
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: ListaEventosComponent },
      { path: 'almacen', component: AlmacenFormComponent },
      { path: 'almacen-view', component: AlmacenViewComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {path:'register', component: SelectorRolComponent},
  { path: 'registro/conductor', component: RegistroConductorComponent },
  { path: 'registro/almacen', component: RegistroAlmacenComponent },
  { path: '**', redirectTo: 'main' }, 
];

