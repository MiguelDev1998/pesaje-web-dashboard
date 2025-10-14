import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Revisa si hay usuario en localStorage
  const usuario = localStorage.getItem('usuario');

  if (usuario) {
    return true; // si esta logeado entra
  } else {
    router.navigate(['/login']); // si no, lo manda al login
    return false;
  }
};
