import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatIcon,RouterLink,RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  constructor(
    private router: Router,
  ) {}

  logOut(){
    localStorage.clear();
    window.location.href= '/main';  }
}