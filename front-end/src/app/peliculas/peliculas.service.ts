import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  FiltroPeliculas,
  PeliculaCreacionDTO,
  PeliculaDTO,
  PeliculaPostGet,
  PeliculasLandingDTO,
  PeliculasPutGetDTO,
} from './pelicula';
import { formatearFecha } from '../utilidades/utilidades';
import { PaginacionDTO } from '../utilidades/modelos/modelos';
import { construirQueryParams } from '../utilidades/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private httpService = inject(HttpClient);

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}peliculas/`;
  constructor() {}

  public GetPaginated(
    paginacion: PaginacionDTO
  ): Observable<HttpResponse<PeliculaDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpService.get<PeliculaDTO[]>(`${this.urlBase}getAll`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public PostGet(): Observable<PeliculaPostGet> {
    return this.httpService.get<PeliculaPostGet>(`${this.urlBase}CinesGeneros`);
  }

  public Post(peliculaCreacionDTO: PeliculaCreacionDTO) {
    const formData = this.construirFormData(peliculaCreacionDTO);
    return this.httpService.post(this.urlBase, formData);
  }

  public GetById(id: number): Observable<PeliculaDTO> {
    return this.httpService.get<PeliculaDTO>(`${this.urlBase}${id}`);
  }

  public GetLanding(): Observable<PeliculasLandingDTO> {
    return this.httpService.get<PeliculasLandingDTO>(`${this.urlBase}Landing`);
  }

  public PutGet(id: number): Observable<PeliculasPutGetDTO> {
    return this.httpService.get<PeliculasPutGetDTO>(
      `${this.urlBase}PutGet/${id}`
    );
  }

  public Put(id: number, peliculaCreacionDTO: PeliculaCreacionDTO) {
    const formData = this.construirFormData(peliculaCreacionDTO);
    return this.httpService.put<PeliculasPutGetDTO>(
      `${this.urlBase}${id}`,
      formData
    );
  }

  public Filtrar(valores: any): Observable<HttpResponse<PeliculaDTO[]>> {
    const params = new HttpParams({ fromObject: valores });
    return this.httpService.get<PeliculaDTO[]>(`${this.urlBase}filtrar`, {
      params,
      observe: 'response',
    });
  }

  public Delete(id: number) {
    console.log(id);
    return this.httpService.delete(`${this.urlBase}${id}`);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    if (pelicula.fechaLanzamiento)
      formData.append(
        'fechaLanzamiento',
        formatearFecha(pelicula.fechaLanzamiento)
      );

    if (pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
