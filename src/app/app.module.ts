import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
// @ts-ignore
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppComponent,
    NavbarComponent
  ],
  providers: [],
})
export class AppModule { }
