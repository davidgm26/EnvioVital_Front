import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlmacenService } from '../../../services/almacen.service';
import { ConductorService } from '../../../services/conductor.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ProvinciaService } from '../../../services/provincia.service';
import { NavbarFormComponent } from '../navbar-form/navbar-form.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { uniqueFieldsValidator } from '../../../validators/unique-fields.validator';

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarFormComponent,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css'],
})
export class RegistroAlmacenComponent implements OnInit {
  registroForm: FormGroup;
  provincias: any[] = [];
  rol = "ALMACEN";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private almacenRegistroService: AlmacenService,
    private conductorService: ConductorService,
    private usuarioService: UsuarioService,
    private provinciaService: ProvinciaService,
    private toastr: ToastrService
  ) {
    this.registroForm = this.createForm();
  }

  ngOnInit(): void {
    this.cargarProvincias();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idProvincia: [null, Validators.required],
      descripcion: ['', Validators.required],
      usuario: this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
    }, { asyncValidators: [uniqueFieldsValidator(this.almacenRegistroService, this.conductorService, this.usuarioService)] });
  }

  private cargarProvincias(): void {
    this.provinciaService.obtenerProvincias().subscribe({
      next: (resp) => this.provincias = resp,
      error: (error) => console.error(error)
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.submitForm();
    } else {
      this.handleInvalidForm();
    }
  }

  private submitForm(): void {
    const formData = this.registroForm.value;
    this.almacenRegistroService.guardarAlmacen(formData).subscribe({
      next: () => {
        this.toastr.success('Almacén registrado con éxito', 'Éxito');
        this.router.navigate(['/main']);
      },
      error: (error) => this.handleError(error)
    });
  }

  private handleInvalidForm(): void {
    console.log('Formulario inválido, revisa los campos.');
    this.displayFormErrors();
  }

  private handleError(error: any): void {
    console.error('Error al registrar el almacén:', error);
    const errorMessage = error.error?.mensaje;
    if (errorMessage) {
      if (errorMessage.includes('ya existe')) {
        this.toastr.error('El nombre de usuario ya existe', 'Error');
      } else {
        this.toastr.error(errorMessage, 'Error');
      }
    } else {
      this.toastr.error('Error al registrar el almacén', 'Error');
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
      direccion: { required: 'La dirección es obligatoria.' },
      email: { required: 'El email es obligatorio.', email: 'El email no es válido.' },
      idProvincia: { required: 'La provincia es obligatoria.' },
      descripcion: { required: 'La descripción es obligatoria.' },
      username: { required: 'El nombre de usuario es obligatorio.' },
      password: { required: 'La contraseña es obligatoria.', minlength: 'Debe tener al menos 6 caracteres.' },
    };

    return errorMessages[controlName][errorKey] || 'Error desconocido';
  }
}
