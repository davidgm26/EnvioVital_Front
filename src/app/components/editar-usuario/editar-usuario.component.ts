import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConductorResponse } from '../../interfaces/conductor-response';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../interfaces/provincia';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  editForm: FormGroup;
  provincias: Provincia [] = [];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public conductor: ConductorResponse,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<EditarUsuarioComponent>, 
    private provinciaService: ProvinciaService,
  ) {
    this.editForm = this.formBuilder.group({
      nombre: [conductor.nombre, Validators.required],
      apellidos: [conductor.apellidos, Validators.required],
      email: [conductor.email, Validators.required],
      telefono: [conductor.telefono, Validators.required],
      dni: [conductor.dni, Validators.required],
      direccion: [conductor.direccion, Validators.required],
      fechaNacimiento: [conductor.fechaNacimiento, Validators.required],
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

}