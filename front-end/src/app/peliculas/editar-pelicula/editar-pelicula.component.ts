import { Component } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css',
})
export class EditarPeliculaComponent {
  modelo?: PeliculaDTO = {
    titulo: 'Spider-Man',
    trailer: 'añslfj',
    fechaLanzamiento: new Date(),
    enCines: true,
    poster:
      'https://m.media-amazon.com/images/M/MV5BOGVkODYxMDEtODczZC00MjRiLTg3ZWYtZjgzN2QyMDBjZTUzXkEyXkFqcGc@._V1_FMjpg_UX700_.jpg',
    resumen: 'cosa',
  };

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log('editando película', pelicula);
  }
}
