import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {
  @Input() usuarioId!: number; // Accept usuarioId as input
  cambiarPassForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.cambiarPassForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {
    if (!this.usuarioId) {
      console.error("usuarioId no proporcionado");
      this.router.navigate(['/']);
    }
  }

  private passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsDontMatch: true };
  }

  onSubmit(): void {
    if (this.cambiarPassForm.invalid) {
      this.errorMessage = 'Por favor, asegúrese de que todos los campos sean válidos.';
      return;
    }

    const { oldPassword, newPassword } = this.cambiarPassForm.value;

    this.usuarioService.changePassword(this.usuarioId, oldPassword, newPassword).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.toastr.success('¡Contraseña cambiada exitosamente!');
        this.router.navigate(['/']);
        this.cambiarPassForm.reset();
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error cambiando la contraseña';
        this.successMessage = null;
        this.toastr.error(this.errorMessage ?? 'Error desconocido');
      }
    });
  }
}
