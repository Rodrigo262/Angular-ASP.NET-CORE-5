import { Component, inject } from '@angular/core';
import {
  PeliculaCreacionDTO,
  PeliculaDTO,
  PeliculasPutGetDTO,
} from '../pelicula';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { MultipleSelectorModel } from '../../utilidades/selector-multiple/MultipleselectorModel';
import { ActorAutoCompleteDTO } from '../../actores/actor';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css',
})
export class EditarPeliculaComponent {
  private router = inject(Router);
  private peliculasService = inject(PeliculasService);
  private activedRoute = inject(ActivatedRoute);

  errores: string[] = [];

  modelo!: PeliculaDTO;

  generosNoSeleccionados!: MultipleSelectorModel[];
  generosSeleccionados!: MultipleSelectorModel[];
  cinesNoSeleccionados!: MultipleSelectorModel[];
  cinesSeleccionados!: MultipleSelectorModel[];
  actoresSeleccionados!: ActorAutoCompleteDTO[];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.peliculasService.PutGet(params['id']).subscribe({
        next: (modeloPutGet) => {
          this.modelo = modeloPutGet.peliculaDTO;
          this.actoresSeleccionados = modeloPutGet.peliculaActorDTO;
          this.generosNoSeleccionados =
            modeloPutGet.generosNoSeleccionados?.map((genero) => {
              return <MultipleSelectorModel>{
                llave: genero.id,
                valor: genero.nombre,
              };
            });
          this.generosSeleccionados = modeloPutGet.generosSeleccionados?.map(
            (genero) => {
              return <MultipleSelectorModel>{
                llave: genero.id,
                valor: genero.nombre,
              };
            }
          );
          this.cinesSeleccionados = modeloPutGet.cinesNoSeleccionados?.map(
            (cine) => {
              return <MultipleSelectorModel>{
                llave: cine.id,
                valor: cine.nombre,
              };
            }
          );
          this.cinesNoSeleccionados = modeloPutGet.cinesSeleccionados?.map(
            (cine) => {
              return <MultipleSelectorModel>{
                llave: cine.id,
                valor: cine.nombre,
              };
            }
          );
        },
        error: (errores) => {
          this.router.navigate(['']);
        },
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.Put(this.modelo.id, pelicula).subscribe({
      next: () => {
        this.router.navigate(['.']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
