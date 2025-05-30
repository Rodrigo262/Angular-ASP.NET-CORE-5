import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css',
})
export class ListadoPeliculasComponent {
  private peliculasServices = inject(PeliculasService);

  @Input()
  peliculas: PeliculaDTO[] = [];

  @Output()
  borrado: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  borrar(id: number): void {
    this.peliculasServices.Delete(id).subscribe({
      next: () => {
        this.borrado.emit();
      },
      error: () => {},
    });
  }
}
