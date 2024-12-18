import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evento } from '../../../interfaces/evento';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../interfaces/provincia';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor,MatFormFieldModule , MatSelectModule, MatInputModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent implements OnInit {

  editForm: FormGroup;
  provincias: Provincia[] = []
  provinciaInicio!: string;



  constructor(
    @Inject(MAT_DIALOG_DATA) public evento: Evento,
    private provinciaService: ProvinciaService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<EditarEventoComponent>
  ) {
    this.editForm = this.formBuilder.group({
      nombre: [
        evento.nombre, Validators.required
      ],
      descripcion: [
        evento.descripcion, Validators.required
      ],
      idProvincia: [
        evento.provincia, Validators.required
      ]
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
      }}
    );
  }


  cancelar() {
    this.dialog.close();
  }

  guardarCambios() {
    if(this.editForm.valid){
      this.dialog.close(this.editForm.value);
    }
  }
}
