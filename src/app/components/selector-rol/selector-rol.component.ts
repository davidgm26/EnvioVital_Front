import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-selector-rol',
  standalone: true,
  imports: [MatCardModule,[MatCardModule, MatChipsModule, MatProgressBarModule, MatButtonModule]],
  templateUrl: './selector-rol.component.html',
  styleUrl: './selector-rol.component.css'
})
export class SelectorRolComponent {

}
