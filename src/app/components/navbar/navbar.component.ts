import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoRegistroComponent } from '../dialogo-registro/dialogo-registro.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  openRegisterDialog(): void {
    this.dialog.open(DialogoRegistroComponent);
  }

  openMenu(): void {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  ngAfterViewInit(): void {
  }
}
