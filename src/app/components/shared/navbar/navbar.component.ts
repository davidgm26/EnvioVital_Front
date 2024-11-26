import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from "@angular/common";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('logged') === 'true') {
      this.logged = true;
    }
  }

  openMenu(): void {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  logOut(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.authService.clearLocalStorage();
      this.logged = false;
      this.router.navigate(['/main']);
    }
  }

  navegarPerfil(): void {
    const rol = localStorage.getItem('rol');
    if (rol === 'CONDUCTOR') {
      this.router.navigate(['/perfil/conductor']);
    } else if (rol === 'ALMACEN') {
      this.router.navigate(['/perfil/almacen']);
    } else {
      this.router.navigate(['/almacen']);
    }
  }

  navegarAInicio(): void {
    this.router.navigate(['/main']);
  }
}
