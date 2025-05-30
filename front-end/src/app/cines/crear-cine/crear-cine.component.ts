import { Component, inject } from '@angular/core';
import { CineCreacionDTO } from '../cine';
import { Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
})
export class CrearCineComponent {
  private router = inject(Router);
  private cinesService = inject(CinesService);

  errores: string[] = [];

  guardarCambios(cine: CineCreacionDTO): void {
    this.cinesService.Post(cine).subscribe({
      next: () => {
        this.router.navigate(['/cines']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
