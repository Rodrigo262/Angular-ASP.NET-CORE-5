import { ActorAutoCompleteDTO } from '../actores/actor';
import { CineDTO } from '../cines/cine';
import { GeneroDTO } from '../generos/genero';

export interface PeliculaCreacionDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: File;
  generosIds: number[];
  actores: ActorAutoCompleteDTO[];
  cinesIds: number[];
}

export interface PeliculaDTO {
  id: number;
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster?: string;
  generos?: GeneroDTO[];
  actores?: ActorAutoCompleteDTO[];
  cines?: CineDTO[];
}

export interface PeliculaPostGet {
  generos: GeneroDTO[];
  cines: CineDTO[];
}

export interface PeliculasLandingDTO {
  enCines: PeliculaDTO[];
  proximosEstrenos: PeliculaDTO[];
}

export interface PeliculasPutGetDTO {
  peliculaDTO: PeliculaDTO;
  generosSeleccionados: GeneroDTO[];
  generosNoSeleccionados: GeneroDTO[];
  cinesSeleccionados: CineDTO[];
  cinesNoSeleccionados: CineDTO[];
  peliculaActorDTO: ActorAutoCompleteDTO[];
}

export interface FiltroPeliculas {
  titulo: string;
  generoId: number;
  proximosEstrenos: boolean;
  enCines: boolean;
  page: number;
  pageSize: number;
}
