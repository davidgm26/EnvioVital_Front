import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tabla-admin',
  standalone: true,
  imports: [MatIcon,NgIf,NgFor,NgClass],
  templateUrl: './tabla-admin.component.html',
  styleUrl: './tabla-admin.component.css'
})
export class TablaAdminComponent {

  @Input() headers: string[] = [];
  @Input() data: any[] = [];

}
