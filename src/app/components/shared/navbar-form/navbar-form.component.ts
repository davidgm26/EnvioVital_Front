import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-form',
  standalone: true,
  imports: [],
  templateUrl: './navbar-form.component.html',
  styleUrl: './navbar-form.component.css'
})
export class NavbarFormComponent {
  @Input() rol!: string;

  constructor(
    private router: Router,
  ) {}

  navegarAInicio(): void {
    this.router.navigate(['/main']);
  }
}
