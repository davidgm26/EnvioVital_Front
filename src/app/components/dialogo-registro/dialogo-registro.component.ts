import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialogo-registro',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialogo-registro.component.html',
  styleUrls: ['./dialogo-registro.component.css']
})
export class DialogoRegistroComponent {
  constructor(private router: Router, private dialogRef: MatDialogRef<DialogoRegistroComponent>) {}


  onConClick(): void {
    this.dialogRef.close();

    this.router.navigate(['/registro/conductor']);
  }

  onAlmClick(): void {
    this.dialogRef.close();

    this.router.navigate(['/registro/almacen']);
  }
}
