import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlmacenFormComponent } from '../componentes/almacen-form/almacen-form.component';
import { AlmacenViewComponent } from '../componentes/almacen-view/almacen-view.component';
import { ConductorFormComponent } from '../componentes/conductor-form/conductor-form.component';
import { ConductorViewComponent } from '../componentes/conductor-view/conductor-view.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    { path: "almacen/:id", component: AlmacenFormComponent },
    { path: "almacen-view/:id", component: AlmacenViewComponent },
    { path: "conductor/:id", component: ConductorFormComponent },
    { path: "conductor-view/:id", component: ConductorViewComponent }
  ];

