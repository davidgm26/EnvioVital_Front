import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';
import { log } from 'console';



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

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }


  crearFormulario(){
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    debugger;
    this.loginRequest = this.loginForm.value;
    if(this.loginForm.valid){
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
          localStorage.setItem('token', resp.token);
          console.log(resp);
          this.router.navigate(['/main']);
        },
        (error) => {
          console.log(error.error.mensaje);
          this.toast.error(error.error.mensaje , 'Error');  


        })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



}
