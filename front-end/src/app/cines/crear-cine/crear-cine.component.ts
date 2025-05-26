import { Component, inject } from '@angular/core';
import { CineCreacionDTO } from '../cine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
})
export class CrearCineComponent {
  private router = inject(Router);

  guardarCambios(actor: CineCreacionDTO) {
    this.router.navigate(['/actores']);
  }
}
