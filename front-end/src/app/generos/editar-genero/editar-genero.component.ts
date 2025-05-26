import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GeneroCreacionDTO } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
})
export class EditarGeneroComponent {
  private router = inject(Router);

  modelo: GeneroCreacionDTO = { nombre: 'Holaaa' };

  guardarCambios(genero: GeneroCreacionDTO): void {
    this.router.navigate(['/generos']);
  }
}
