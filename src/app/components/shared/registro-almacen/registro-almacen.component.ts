import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import { AlmacenService } from '../../../services/almacen.service';
import { ProvinciaService } from '../../../services/provincia.service';
import { NavbarFormComponent } from '../navbar-form/navbar-form.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
    imports: [ReactiveFormsModule,NavbarFormComponent,MatOptionModule,MatSelectModule,MatFormFieldModule,MatInputModule,NgFor,NgIf],
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css'],
})
export class RegistroAlmacenComponent implements OnInit {
  registroForm: FormGroup;
  provincias: any[] = [];
  rol = "ALMACEN"

  constructor(
    private fb: FormBuilder,
    private almacenRegistroService: AlmacenService,
    private provinciaService: ProvinciaService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['',Validators.required],
      direccion: ['',Validators.required],
      email: ['', Validators.required],
      idProvincia: [null, Validators.required],
      descripcion: ['',Validators.required],
      usuario: this.fb.group({
        username: ['',Validators.required],
        password: ['', Validators.required],
      }),
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
  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.almacenRegistroService.guardarAlmacen(formData).subscribe({
        next: (response) => {
          console.log('Almacén registrado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al registrar el almacén:', error);
        },
      });
    } else {
      console.log('Formulario inválido, revisa los campos.');
    }
  }
  public get usuario() {
    return this.registroForm.get('usuario') as FormGroup;
  }

}
