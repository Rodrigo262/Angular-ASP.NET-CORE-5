import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from './seguridad/seguridad.service';

export const esAdminGuard: CanActivateFn = (route, state) => {
  const seguridadServices = inject(SeguridadService);
  const router = inject(Router);
  if (seguridadServices.obtenerRol() === 'admin') return true;

  return router.parseUrl('/');
};
