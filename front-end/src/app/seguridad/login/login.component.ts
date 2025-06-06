import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from '../seguridad';
import {
  extraerErrores,
  extraerErroresEntity,
  parsearErroresAPI,
} from '../../utilidades/utilidades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private seguridadService = inject(SeguridadService);
  private router = inject(Router);

  errores: string[] = [];

  login(credencialesUsuario: CredencialesUsuarioDTO) {
    console.log(credencialesUsuario);
    this.seguridadService.login(credencialesUsuario).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (errors) => {
        this.errores = parsearErroresAPI(errors);
      },
    });
  }
}
