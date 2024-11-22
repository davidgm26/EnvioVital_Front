import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoRegistroComponent } from '../dialogo-registro/dialogo-registro.component';
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit , OnInit{

  logged!: boolean;

  constructor(
    private router: Router,
  ) { }



  ngOnInit(): void {
    debugger;
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

  ngAfterViewInit(): void {
  }
}
