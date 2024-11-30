import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.css']
})
export class VehiculoFormComponent implements OnInit {
  @Input() conductorId!: number;
  formulario: FormGroup;
  tiposVehiculo: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarConductor();
    this.obtenerTiposVehiculo();
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{3}[A-Z]{1}$/)]],
      idConductor: ['', Validators.required],
      idTipoVehiculo: ['', Validators.required]
    });
  }

  private cargarConductor(): void {
    if (this.conductorId) {
      this.formulario.patchValue({ idConductor: this.conductorId });
    } else {
      console.error('No conductorId provided');
      this.router.navigate(['/']);
    }
  }

  private obtenerTiposVehiculo(): void {
    this.http.get<any[]>('/api/tiposVehiculo/lista').subscribe({
      next: (tipos) => {
        this.tiposVehiculo = tipos;
      },
      error: (error) => console.error('Error al obtener los tipos de vehículo:', error)
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido', this.formulario);
      return;
    }

    const datosAEnviar = this.formulario.value;

    this.http.post('/api/vehiculos/guardar', datosAEnviar).subscribe({
      next: () => {
        alert('Vehículo registrado exitosamente');
        this.router.navigate(['/']);
      },
      error: (error) => console.error('Error al registrar el vehículo:', error)
    });
  }
}
