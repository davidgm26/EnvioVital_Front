import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgIf,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  logged!: boolean;

  constructor(
    private router: Router,
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
      localStorage.removeItem('logged');
      this.logged = false;
      this.router.navigate(['/main'])
    }
  }

  navegarPerfil() {
    const id = localStorage.getItem('id');
    if (localStorage.getItem('rol') === 'CONDUCTOR' && id) {
      this.router.navigate([`/perfil/conductor/${id}`]);
    } else {
      this.router.navigate(['/almacen']);
    }
  }
  navegarAInicio() {
    this.router.navigate(['/main']);
  }


}
