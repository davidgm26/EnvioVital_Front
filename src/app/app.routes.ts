import { Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { AlmacenFormComponent } from './components/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from './components/almacen-view/almacen-view.component';
import { RegistroAlmacenComponent } from './components/shared/registro-almacen/registro-almacen.component';
import { RegistroConductorComponent } from './components/shared/registro-conductor/registro-conductor.component';
import { ListaAlmacenesComponent } from './components/lista-almacenes/lista-almacenes.component';
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SelectorCardComponent } from './components/shared/selector-card/selector-card.component';

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
      { path: 'evento/:id/almacenes', component: ListaAlmacenesComponent  },
    ]
  },
  {path:'register', component: SelectorCardComponent},
  { path: 'registro/conductor', component: RegistroConductorComponent },
  { path: 'registro/almacen', component: RegistroAlmacenComponent },
  { path: '**', redirectTo: 'main' }, 
];

