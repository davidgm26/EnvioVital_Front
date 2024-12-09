import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgIf,
    NgTemplateOutlet,
    MatDialogActions,
    MatButton
  ],
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  descripcion: string;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.descripcion = data.context.descripcion;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
