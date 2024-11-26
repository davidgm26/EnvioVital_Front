import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastrService);

  if (authService.isUserLogged()) {
    if (localStorage.getItem('rol') === 'CONDUCTOR' || localStorage.getItem('rol') === 'ALMACEN') {
      return true;
    } else {
      toastService.error('No tienes permisos para acceder a esta sección', 'Error', {
        timeOut: 5000,  // Tiempo en milisegundos
        closeButton: true, // Opcional: agrega un botón de cerrar
        progressBar: true // Opcional: muestra una barra de progreso
      });
    }
  } else {
    toastService.info('Por favor inicie sesión para continuar', 'Inicie Sesión', {
      timeOut: 5000
    });
  }
  return router.navigate(['/login']);
};
