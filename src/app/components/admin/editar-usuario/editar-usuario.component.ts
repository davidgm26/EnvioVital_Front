import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConductorResponse } from '../../../interfaces/conductor-response';
import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../interfaces/provincia';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PHONE_REGEX = /^(?:(?:\+|00)34)?[6-9]\d{8}$/;
// const DNI_REGEX = /^\d{8}[A-HJ-NP-TV-Z]$/;
// const NAME_REGEX = /^[a-zA-Z]+$/;
// const USERNAME_REGEX = /^[a-zA-Z\s-]+$/;



@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatSelectModule, MatInputModule,],
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

  cancelar() {
    this.dialog.close();
  }

  guardarCambios() {
    if(this.editForm.valid){
      this.dialog.close(this.editForm.value);
    }
  }
 


}