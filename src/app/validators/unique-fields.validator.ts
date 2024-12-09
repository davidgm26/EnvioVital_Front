import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlmacenService } from '../services/almacen.service';
import { ConductorService } from '../services/conductor.service';
import { UsuarioService } from '../services/usuario.service';

export function uniqueFieldsValidator(
  almacenService: AlmacenService,
  conductorService: ConductorService,
  usuarioService: UsuarioService
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const emailControl = control.get('email');
    const usernameControl = control.get('usuario.username');
    const dniControl = control.get('dni');

    if (!emailControl || !usernameControl || !dniControl) {
      return of(null);
    }

    // Mocking the service methods for now
    const checkEmailExists = (email: string) => of(false); // Replace with actual service call
    const checkUsernameExists = (username: string) => of(false); // Replace with actual service call
    const checkDniExists = (dni: string) => of(false); // Replace with actual service call

    return forkJoin([
      checkEmailExists(emailControl.value),
      checkEmailExists(emailControl.value),
      checkUsernameExists(usernameControl.value),
      checkDniExists(dniControl.value)
    ]).pipe(
      map(([almacenExists, conductorEmailExists, usernameExists, dniExists]) => {
        const errors: ValidationErrors = {};
        if (almacenExists || conductorEmailExists) {
          errors['emailExists'] = true;
        }
        if (usernameExists) {
          errors['usernameExists'] = true;
        }
        if (dniExists) {
          errors['dniExists'] = true;
        }
        return Object.keys(errors).length ? errors : null;
      }),
      catchError(() => of(null))
    );
  };
}
