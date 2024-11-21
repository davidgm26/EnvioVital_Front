import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ConductorRegistroService } from '../../services/conductor-registro.service';
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";

@Component({
  selector: 'app-registro-conductor',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarFormComponent],
  templateUrl: './registro-conductor.component.html',
  styleUrls: ['./registro-conductor.component.css'],
  providers: [],
})

export class RegistroConductorComponent implements OnInit{
  registroForm: FormGroup;
  rol = "CONDUCTOR/A"

  constructor(
    private fb: FormBuilder,
    private conductorRegistroService: ConductorRegistroService
  ) {
    this.registroForm = this.fb.group({
      nombre: [''],
      apellidos: [''],
      dni: [''],
      direccion: [''],
      telefono: [''],
      fechaNacimiento: [''],
      email: [''],
      usuario: this.fb.group({
        username: [''],
        password: [''],
      }),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formData = this.registroForm.value;
    this.conductorRegistroService.guardarConductor(formData).subscribe({
      next: (response) => {
        console.log('Conductor registrado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al registrar el conductor:', error);
      },
    });
    this.conductorRegistroService.guardarConductor(formData).subscribe({
      next: (response) => {
        console.log('Conductor registrado con éxito:', response);
        alert('¡Registro exitoso! Se ha enviado un correo de confirmación a ' + formData.email);
      },
      error: (error) => {
        console.error('Error al registrar el conductor:', error);
        alert('Hubo un error al registrar el conductor. Inténtalo de nuevo.');
      },
    });
  }
}
