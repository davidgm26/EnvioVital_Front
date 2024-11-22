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
      if (localStorage.getItem('logged') === 'true') {
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
    if (localStorage.getItem('rol') === 'conductor') {
      this.router.navigate(['/registro/conductor']);
    } else {
      this.router.navigate(['/almacen']);
    }
  }
}
