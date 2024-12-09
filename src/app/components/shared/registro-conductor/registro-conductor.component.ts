import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { ConductorService } from "../../../services/conductor.service";
import { CommonModule } from "@angular/common";
import { NavbarFormComponent } from '../navbar-form/navbar-form.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-conductor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarFormComponent],
  templateUrl: './registro-conductor.component.html',
  styleUrls: ['./registro-conductor.component.css'],
  providers: [],
})
export class RegistroConductorComponent implements OnInit {
  registroForm: FormGroup;
  rol = "CONDUCTOR/A";

  constructor(
    private fb: FormBuilder,
    private conductorService: ConductorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{8}[A-Za-z]+$/)]], // 8 dígitos y al menos un carácter alfabético
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]], // Exactamente 9 números
      fechaNacimiento: ['', [Validators.required, this.mayorDeEdadValidator]], // Campo obligatorio con validación personalizada
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
        next: () => {
          this.toastr.success('Conductor registrado con éxito', 'Éxito');
          this.router.navigate(['/main']);
        },
        error: (error) => this.handleError(error),
      });
    } else {
      this.handleInvalidForm();
    }
  }

  private handleInvalidForm(): void {
    this.displayFormErrors();
  }

  private handleError(error: any): void {
    console.error('Error al registrar el conductor:', error);
    const errorMessage = error.error?.mensaje;
    if (errorMessage) {
      if (errorMessage.includes('ya existe')) {
        this.toastr.error('El nombre de usuario ya existe', 'Error');
      } else {
        this.toastr.error(errorMessage, 'Error');
      }
    } else {
      this.toastr.error('Error al registrar el conductor', 'Error');
    }
  }

  private displayFormErrors(): void {
    Object.keys(this.registroForm.controls).forEach(key => {
      const controlErrors = this.registroForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          this.toastr.error(this.getErrorMessage(key, errorKey), 'Error');
        });
      }
    });
  }

  private getErrorMessage(controlName: string, errorKey: string): string {
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      nombre: { required: 'El nombre es obligatorio.' },
      apellidos: { required: 'Los apellidos son obligatorios.' },
      dni: { required: 'El DNI es obligatorio.', pattern: 'El DNI no es válido.' },
      direccion: { required: 'La dirección es obligatoria.' },
      telefono: { required: 'El teléfono es obligatorio.', pattern: 'El teléfono no es válido.' },
      fechaNacimiento: { required: 'La fecha de nacimiento es obligatoria.', mayorDeEdad: 'Debes ser mayor de edad.' },
      email: { required: 'El email es obligatorio.', email: 'El email no es válido.' },
      username: { required: 'El nombre de usuario es obligatorio.' },
      password: { required: 'La contraseña es obligatoria.', minlength: 'Debe tener al menos 6 caracteres.' },
    };

    return errorMessages[controlName][errorKey] || 'Error desconocido';
  }

  private mayorDeEdadValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad >= 18 ? null : { mayorDeEdad: true };
  }

  public get usuario() {
    return this.registroForm.get('usuario') as FormGroup;
  }
}
