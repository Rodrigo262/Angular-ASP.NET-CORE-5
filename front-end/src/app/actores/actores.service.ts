import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../utilidades/modelos/modelos';
import { Observable } from 'rxjs';
import { ActorAutoCompleteDTO, ActorCreacionDTO, ActorDTO } from './actor';
import { construirQueryParams } from '../utilidades/funciones/construirQueryParams';
import { formatearFecha } from '../utilidades/utilidades';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  private httpService = inject(HttpClient);

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}actores/`;
  constructor() {}

  public GetAll(): Observable<ActorDTO[]> {
    return this.httpService.get<ActorDTO[]>(`${this.urlBase}getAll`);
  }

  public GetPaginated(
    paginacion: PaginacionDTO
  ): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpService.get<ActorDTO[]>(`${this.urlBase}getAll`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public Post(actor: ActorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.httpService.post(this.urlBase, formData);
  }

  public GetById(id: number): Observable<ActorDTO> {
    return this.httpService.get<ActorDTO>(`${this.urlBase}${id}`);
  }

  public Put(id: number, actor: ActorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.httpService.put(`${this.urlBase}${id}`, formData);
  }

  public Delete(id: number) {
    return this.httpService.delete(`${this.urlBase}${id}`);
  }

  public GetByName(nombre: string): Observable<ActorAutoCompleteDTO[]> {
    return this.httpService.get<ActorAutoCompleteDTO[]>(
      `${this.urlBase}${nombre}`
    );
  }

  private construirFormData(actor: ActorCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', actor.nombre);

    if (actor.biografia) {
      formData.append('biografía', actor.biografia);
    }

    if (actor.fechaNacimiento) {
      formData.append(
        'fechaNacimiento',
        formatearFecha(new Date(actor.fechaNacimiento))
      );
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;
  }
}
