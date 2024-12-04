import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { Provincia } from '../../../interfaces/provincia';
import { MatDialogRef } from '@angular/material/dialog';
import { ProvinciaService } from '../../../services/provincia.service';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [MatSelectModule,MatInputModule, NgFor, MatOption,ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {

  form: FormGroup;
  provincias: Provincia[] = [];

  constructor(
    private dialog: MatDialogRef<CrearEventoComponent>,
    private formBuilder: FormBuilder,
    private provinciaService: ProvinciaService

  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idProvincia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.provinciaService.obtenerProvincias().subscribe({
      next: (resp) => {
        this.provincias = resp;
      },
      error: (error) => {
        console.error(error);
      }
    }
    );
  }
  guardarCambios() {
    if (this.form.valid) {
      this.dialog.close(this.form.value);
    }
  }
  cancelar(){
    this.dialog.close();
  }
}
