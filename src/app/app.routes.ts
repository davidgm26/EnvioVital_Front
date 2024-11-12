import { Routes } from '@angular/router';
import { AlmacenFormComponent } from '../componentes/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from '../componentes/almacen-view/almacen-view.component';

export const routes: Routes = [
  { path: 'almacen/:id', component: AlmacenFormComponent },
  { path: 'almacen-view/:id', component: AlmacenViewComponent },
  { path: '', redirectTo: '/almacen-view/1', pathMatch: 'full' } // Default route
];
