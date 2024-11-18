import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-conductor-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conductor-form.component.html',
  styleUrls: ['./conductor-form.component.css'],
  providers: []
})
export class ConductorFormComponent implements OnInit {
  formulario: FormGroup;
  conductorId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService
  ) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit(): void {
    this.conductorId = Number(this.route.snapshot.paramMap.get('id'));
    this.conductorId ? this.cargarDatosConductor() : this.redirigirAInicio();
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private redirigirAInicio(): void {
    console.error('No conductorId provided');
    this.router.navigate(['/']);
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorId(this.conductorId).subscribe({
      next: (conductor) => {
        if (conductor) {
          this.formulario.patchValue({
            nombre: conductor.nombre,
            apellidos: conductor.apellidos,
            dni: conductor.dni,
            direccion: conductor.direccion,
            telefono: conductor.telefono,
            fechaNacimiento: conductor.fechaNacimiento,
            email: conductor.email
          });
        }
      },
      error: (error) => console.error("Error al cargar los datos del conductor:", error)
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const datosAEnviar = this.prepararDatosAEnviar();

    this.conductorService.actualizarConductor(this.conductorId, datosAEnviar).subscribe({
      next: (response) => {
        console.log("Conductor actualizado:", response);
        window.alert('Conductor actualizado exitosamente');
        this.router.navigate([`/conductor-view/${this.conductorId}`]);
      },
      error: (error) => console.error("Error al actualizar el conductor:", error)
    });
  }

  private prepararDatosAEnviar(): any {
    const { nombre, apellidos, dni, direccion, telefono, fechaNacimiento, email } = this.formulario.value;
    return { nombre, apellidos, dni, direccion, telefono, fechaNacimiento, email };
  }
}
