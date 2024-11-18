import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ConductorRegistroService } from '../../services/conductor-registro.service';

@Component({
  selector: 'app-registro-conductor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-conductor.component.html',
  styleUrls: ['./registro-conductor.component.css'],
  providers: [],
})

export class RegistroConductorComponent implements OnInit{
  registroForm: FormGroup;

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
      fechaNacimiento: [''], // Este campo debería recibir una fecha en formato string ISO
      email: [''],
      usuario: this.fb.group({
        username: [''],
        password: [''],
        // Agrega más campos de usuario si es necesario
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
  }
}
