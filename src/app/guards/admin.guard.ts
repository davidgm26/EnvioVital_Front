import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastrService);

  if (authService.isUserLogged()) {
    if (localStorage.getItem('rol') === 'ADMIN') {
      return true;
    } else {
      router.navigate(['/main']).then(() => {
        toastService.error('No tienes permisos para acceder a esta sección', 'Error', {
          timeOut: 5000
        });
      });
      return false;
    }
  }
  // toastService.info('Usuario no está logueado', 'Información', {
  //   timeOut: 5000
  // });
  router.navigate(['/login']);
  return false;
};