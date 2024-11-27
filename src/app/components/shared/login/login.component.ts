import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../interfaces/login-request';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




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
    private toast: ToastrService,
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
          if(resp.rol === 'ADMIN'){
            this.router.navigate(['/admin']);
          }else{
            window.location.href = '/main';
          }

        },
        (error) => {
          console.log(error.error.mensaje);
          this.toast.error(error.error.mensaje, 'Error');
        })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



}
