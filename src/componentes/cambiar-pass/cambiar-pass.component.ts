import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pass } from '../../app/models/almacen.model'
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent {
  cambiarPassForm: FormGroup;
  almacenId!: number;

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cambiarPassForm = this.fb.group({
      actualPass: ['', Validators.required],
      nuevaPass: ['', [Validators.required, Validators.minLength(6)]],
      repitePass: ['', Validators.required]
    }, { validator: this.matchPasswords });
  }

  ngOnInit(): void {
    this.almacenId = +this.route.snapshot.paramMap.get('id')!;
  }

  matchPasswords(group: FormGroup) {
    return group.get('nuevaPass')?.value === group.get('repitePass')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.cambiarPassForm.invalid) {
      return;
    }

    const { actualPass, nuevaPass } = this.cambiarPassForm.value;
    this.almacenService.cambiarPassword(this.almacenId, actualPass, nuevaPass).subscribe(
      (response: any) => {
        console.log('Contraseña actualizada exitosamente:', response);
        this.router.navigate([`/almacen-view/${this.almacenId}`]);
      },
      (error: any) => {
        console.error('Error al actualizar la contraseña:', error);
      }
    );
  }
}
