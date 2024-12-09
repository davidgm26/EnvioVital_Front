import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-form',
  standalone: true,
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent {
  @Input() rol!: string;

  constructor(private router: Router) {}

  navegarAInicio(): void {
    this.router.navigate(['/main']);
  }
}
