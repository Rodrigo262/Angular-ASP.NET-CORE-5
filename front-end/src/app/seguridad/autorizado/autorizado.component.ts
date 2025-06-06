import { Component, inject, Input } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrl: './autorizado.component.css',
})
export class AutorizadoComponent {
  private seguridadService = inject(SeguridadService);

  @Input()
  rol!: string;

  estaAutorizado(): boolean {
    if (this.rol) return this.seguridadService.obtenerRol() === this.rol;
    else return this.seguridadService.estaLogueado();
  }
}
