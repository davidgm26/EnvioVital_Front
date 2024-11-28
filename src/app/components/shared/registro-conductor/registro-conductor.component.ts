import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConductorService} from "../../../services/conductor.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-registro-conductor',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro-conductor.component.html',
  styleUrls: ['./registro-conductor.component.css'],
  providers: [],
})

export class RegistroConductorComponent implements OnInit{
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private conductorService : ConductorService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{8}[A-Za-z]+$/)]], // 8 dígitos y al menos un carácter alfabético
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]], // Exactamente 9 números
      fechaNacimiento: ['', Validators.required], // Campo obligatorio
      email: ['', [Validators.required, Validators.email]], // Email válido y obligatorio
      usuario: this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]], // Al menos 6 caracteres y obligatorio
      }),
    });
  }

    ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.conductorService.guardarConductor(formData).subscribe({
        next: (response) => {
          console.log('Conductor registrado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al registrar el conductor:', error);
        },
      });
    } else {
      console.error('Formulario inválido:', this.registroForm.errors);
    }
  }


  public get usuario() {
    return this.registroForm.get('usuario') as FormGroup;
  }
}
