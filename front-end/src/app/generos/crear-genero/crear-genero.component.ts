import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneroCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrl: './crear-genero.component.css',
})
export class CrearGeneroComponent {
  constructor() {}
  private router = inject(Router);
  private generosService = inject(GenerosService);

  errores: string[] = [];

  guardarCambios(genero: GeneroCreacionDTO): void {
    this.generosService.Post(genero).subscribe({
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
