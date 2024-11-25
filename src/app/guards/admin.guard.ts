import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastrService);

  if(authService.isUserLogged()){
    if(localStorage.getItem('rol')=== 'ADMIN'){
      return true;
    }else{
      toastService.error('No tienes permisos para acceder a esta sección');
    }
  }
  toastService.info('Por favor inicie sesión para continuar');
  return router.navigate(['/login']);
};
