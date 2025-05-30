import { Component, inject, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { Router } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { MultipleSelectorModel } from '../../utilidades/selector-multiple/MultipleselectorModel';
import { parsearErroresAPI } from '../../utilidades/utilidades';
import { ActorAutoCompleteDTO } from '../../actores/actor';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css',
})
export class CrearPeliculaComponent implements OnInit {
  private router = inject(Router);
  private peliculasService = inject(PeliculasService);

  errores: string[] = [];
  generosNoSeleccionados: MultipleSelectorModel[] = [];
  generosSeleccionados: MultipleSelectorModel[] = [];

  cinesNoSeleccionados: MultipleSelectorModel[] = [];
  cinesSeleccionados: MultipleSelectorModel[] = [];

  actoreSeleccionados: ActorAutoCompleteDTO[] = [];

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.Post(pelicula).subscribe({
      next: () => {
        this.router.navigate(['.']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
  ngOnInit(): void {
    this.peliculasService.PostGet().subscribe({
      next: (resultado) => {
        this.generosNoSeleccionados = resultado.generos.map((genero) => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre,
          };
        });
        this.cinesNoSeleccionados = resultado.cines.map((cine) => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
