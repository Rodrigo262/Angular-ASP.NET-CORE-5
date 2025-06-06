import { Component, inject } from '@angular/core';
import { CredencialesUsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import {
  extraerErroresEntity,
  parsearErroresAPI,
} from '../../utilidades/utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  private seguridadService = inject(SeguridadService);
  private router = inject(Router);

  errores: string[] = [];

  registrar(credencialesUsuario: CredencialesUsuarioDTO) {
    console.log(credencialesUsuario);
    this.seguridadService.registrar(credencialesUsuario).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (errors) => {
        this.errores = extraerErroresEntity(errors);
      },
    });
  }
}
