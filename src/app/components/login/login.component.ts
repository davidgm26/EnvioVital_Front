import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, 
    MatButtonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginRequest!: LoginRequest;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


    onSubmit(){
      this.loginRequest = this.loginForm.value;
      console.log(this.loginRequest);
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
        localStorage.setItem('token',resp.token);
        console.log(resp);
        this.router.navigate(['/home']);
        },
        (error)=> {
          console.error(error);
        })
    }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



}
