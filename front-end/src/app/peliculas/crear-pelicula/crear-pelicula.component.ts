import { Component, inject } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css',
})
export class CrearPeliculaComponent {
  private router = inject(Router);

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    //this.router.navigate(['/']);
    console.log(pelicula);
  }
}
