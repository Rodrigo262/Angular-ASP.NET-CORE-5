import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from './genero';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../utilidades/modelos/modelos';
import { construirQueryParams } from '../utilidades/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class GenerosService {
  private httpService = inject(HttpClient);

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}generos/`;
  constructor() {}

  public GetAll(): Observable<GeneroDTO[]> {
    return this.httpService.get<GeneroDTO[]>(`${this.urlBase}GetAll`);
  }

  public GetPaginated(
    paginacion: PaginacionDTO
  ): Observable<HttpResponse<GeneroDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpService.get<GeneroDTO[]>(`${this.urlBase}GetPaginated`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public Post(genero: GeneroCreacionDTO) {
    return this.httpService.post(this.urlBase, genero);
  }

  public GetById(id: number): Observable<GeneroDTO> {
    return this.httpService.get<GeneroDTO>(`${this.urlBase}${id}`);
  }

  public Put(id: number, genero: GeneroCreacionDTO) {
    return this.httpService.put(`${this.urlBase}${id}`, genero);
  }

  public Delete(id: number) {
    return this.httpService.delete(`${this.urlBase}${id}`);
  }
}
