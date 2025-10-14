// src/app/controllers/login.controller.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginController {
  usuario: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  onLogin() {
  this.authSvc.login(this.usuario, this.password).subscribe({
    next: (res) => {
      console.log('Login correcto:', res);
      localStorage.setItem('usuario', JSON.stringify(res.usuario)); // guarda solo datos básicos
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Error en login:', err);
      this.errorMsg = err.error?.message || 'Error al iniciar sesión';
    }
  });
}

}
