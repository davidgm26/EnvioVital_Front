import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AlmacenResponse } from '../../../interfaces/almacen-response';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Provincia } from '../../../interfaces/provincia';
import { ProvinciaService } from '../../../services/provincia.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editar-almacen',
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule, MatFormFieldModule, MatInputModule,NgFor],
  templateUrl: './editar-almacen.component.html',
  styleUrl: './editar-almacen.component.css'
})
export class EditarAlmacenComponent implements OnInit {
  editForm: FormGroup;
  provincias: Provincia [] = [];



  constructor(
    @Inject(MAT_DIALOG_DATA) public almacen: AlmacenResponse,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<EditarAlmacenComponent>,
    private provinciaService: ProvinciaService
  ) { 
    this.editForm = this.formBuilder.group({
      nombre: [this.almacen.nombre,Validators.required],
      idProvincia: [this.almacen.provincia, Validators.required],
      direccion: [this.almacen.direccion, Validators.required],
      descripcion: [this.almacen.descripcion, Validators.required],
      email: [this.almacen.email, Validators.required],
  });


  }

  ngOnInit(): void {
      this.cargarProvincias();
  }

  cargarProvincias() {
    this.provinciaService.obtenerProvincias().subscribe(
      resp => {
        this.provincias = resp;
      },
      error => {
        console.error(error);
      }
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
