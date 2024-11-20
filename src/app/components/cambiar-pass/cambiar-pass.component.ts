import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { ConductorService } from "../../services/conductor.service";
import { AlmacenService } from "../../services/almacen.service";

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
  cambiarPassForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  usuarioId!: number; // Definimos usuarioId, lo obtendremos desde la URL

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,  // Usamos el servicio de Usuario
    private route: ActivatedRoute, // Para leer parámetros de la ruta
    private router: Router,  // Para la navegación
    private conductorService: ConductorService,  // Usamos el servicio de Conductor
    private almacenService: AlmacenService  // Usamos el servicio de Almacen
  ) {
    this.cambiarPassForm = this.fb.group({
      oldPassword: ['', [Validators.required]], // Contraseña actual
      newPassword: ['', [Validators.required, Validators.minLength(8)]], // Nueva contraseña
      confirmPassword: ['', [Validators.required]], // Confirmar nueva contraseña
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {
    // Obtenemos el usuarioId de la URL
    this.usuarioId = Number(this.route.snapshot.paramMap.get('usuarioId'));

    if (!this.usuarioId) {
      console.error("usuarioId no proporcionado");
      this.router.navigate(['/']);  // Si no hay usuarioId en la URL, redirigimos a inicio
    }
  }

  // Validación para asegurarse de que las contraseñas coincidan
  private passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsDontMatch: true };
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.cambiarPassForm.invalid) {
      this.errorMessage = 'Por favor, asegúrese de que todos los campos sean válidos.';
      return;
    }

    const { oldPassword, newPassword } = this.cambiarPassForm.value;

    // Llamar al servicio para cambiar la contraseña
    this.usuarioService.changePassword(this.usuarioId, oldPassword, newPassword).subscribe({
      next: (response) => {
        // Si la contraseña se cambió con éxito
        this.successMessage = response.message;
        this.errorMessage = null;

        // Mostrar el mensaje de éxito
        window.alert('¡Contraseña cambiada exitosamente!');

        // Redirigir al main (o página principal)
        this.router.navigate(['/']);  // Redirige a la página principal ("/")

        // Resetea el formulario
        this.cambiarPassForm.reset();
      },
      error: (error) => {
        // Si ocurre un error
        this.errorMessage = error.error.message || 'Error cambiando la contraseña';
        this.successMessage = null;
      }
    });
  }

}
