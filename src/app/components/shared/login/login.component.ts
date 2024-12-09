import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../interfaces/login-request';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,
    MatButtonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginRequest!: LoginRequest;

  loginForm!: FormGroup;

  errorUsername: string = '';

  errorPassword: string = '';

  logged: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.loginRequest = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('logged', this.logged.toString());
          localStorage.setItem('id', resp.id.toString());
          localStorage.setItem('rol', resp.rol);
          console.log(resp);

          // Emit login status change
          this.authService.emitLoginStatus(true);

          // Show confirmation toast with alert message using SweetAlert2
          let mensaje = '';
          if (resp.alertas && resp.alertas.length > 0) {
            if (resp.alertas.length > 1) {
              mensaje = 'Tienes nuevos conductores inscritos, visita tu perfil';
            } else {
              mensaje = `${resp.alertas[0].mensaje} visita tu perfil`;
            }
            Swal.fire({
              title: 'Confirmación',
              text: mensaje,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancelar',
              timer: 5000,
              timerProgressBar: true,
              toast: true,
              position: 'top',
              didClose: () => {
                this.navigateToMain(resp.rol);
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.navigateToMain(resp.rol);
              }
            });
          } else {
            this.navigateToMain(resp.rol);
          }

        },
        (error) => {
          Swal.fire('Error', error.error.mensaje, 'error');
        })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToMain(rol: string) {
    if (rol === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/main']);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
