import { Routes } from '@angular/router';
import { AlmacenFormComponent } from '../componentes/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from '../componentes/almacen-view/almacen-view.component';
import {ConductorFormComponent} from "../componentes/conductor-form/conductor-form.component";
import {ConductorViewComponent} from "../componentes/conductor-view/conductor-view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/conductor-view/1', pathMatch: 'full' }, // Default route
  { path: 'almacen/:id', component: AlmacenFormComponent },
  { path: 'almacen-view/:id', component: AlmacenViewComponent },
  { path: 'conductor/:id', component: ConductorFormComponent },
  { path: 'conductor-view/:id', component: ConductorViewComponent }


];
