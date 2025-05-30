import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../utilidades/modelos/modelos';
import { CineCreacionDTO, CineDTO } from './cine';
import { construirQueryParams } from '../utilidades/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class CinesService {
  private httpService = inject(HttpClient);

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}cines/`;
  constructor() {}

  public GetAll(): Observable<CineDTO[]> {
    return this.httpService.get<CineDTO[]>(`${this.urlBase}getAll`);
  }

  public GetPaginated(
    paginacion: PaginacionDTO
  ): Observable<HttpResponse<CineDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpService.get<CineDTO[]>(`${this.urlBase}getAll`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public Post(cine: CineCreacionDTO) {
    return this.httpService.post(this.urlBase, cine);
  }

  public GetById(id: number): Observable<CineDTO> {
    return this.httpService.get<CineDTO>(`${this.urlBase}${id}`);
  }

  public Put(id: number, cine: CineCreacionDTO) {
    return this.httpService.put(`${this.urlBase}${id}`, cine);
  }

  public Delete(id: number) {
    return this.httpService.delete(`${this.urlBase}${id}`);
  }
}
