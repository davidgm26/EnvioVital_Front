import { Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { AlmacenFormComponent } from './components/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from './components/almacen-view/almacen-view.component';
import { RegistroAlmacenComponent } from './components/shared/registro-almacen/registro-almacen.component';
import { RegistroConductorComponent } from './components/shared/registro-conductor/registro-conductor.component';
import { ListaAlmacenesComponent } from './components/admin/lista-almacenes/lista-almacenes.component';
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { ConductorViewComponent } from './components/conductor-view/conductor-view.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { GestionAlmacenesComponent } from './components/admin/gestion-almacenes/gestion-almacenes.component';
import { GestionEventosComponent } from './components/admin/gestion-eventos/gestion-eventos.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { SelectorRolComponent } from './components/shared/selector-rol/selector-rol.component';
import { adminGuard } from './guards/admin.guard';

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
      { path: 'perfil', canActivate: [authGuard], children: [
        { path: 'conductor', component: ConductorViewComponent },
        { path: 'almacen', component: AlmacenViewComponent },
      ] 
    },
    ]
  },
  {path:'register', component: SelectorRolComponent},
  { path: 'registro/conductor', component: RegistroConductorComponent },
  { path: 'registro/almacen', component: RegistroAlmacenComponent },
  {path: 'admin', canActivate: [adminGuard],component: AdminPanelComponent,children: [
    {path: 'gestion-almacenes', component:GestionAlmacenesComponent },
    {path: 'gestion-eventos', component: GestionEventosComponent},
    {path: 'gestion-usuarios', component:GestionUsuariosComponent },
  ]},
  { path: '**', redirectTo: 'main' }, 
];

