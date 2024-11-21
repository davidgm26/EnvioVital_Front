import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navbar-form',
  standalone: true,
  imports: [],
  templateUrl: './navbar-form.component.html',
  styleUrl: './navbar-form.component.css'
})
export class NavbarFormComponent {
  @Input() rol!: string;
}
