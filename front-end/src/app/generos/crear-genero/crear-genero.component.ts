import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneroCreacionDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrl: './crear-genero.component.css',
})
export class CrearGeneroComponent {
  constructor() {}
  private router = inject(Router);

  guardarCambios(genero: GeneroCreacionDTO): void {
    this.router.navigate(['/generos']);
  }
}
