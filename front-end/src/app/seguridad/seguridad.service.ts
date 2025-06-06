import { inject, Injectable } from '@angular/core';
import {
  CredencialesUsuarioDTO,
  RespuestaAutenticacion,
  UsuarioDTO,
} from './seguridad';
import { Observable, tap } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneroCreacionDTO } from '../generos/genero';
import { PaginacionDTO } from '../utilidades/modelos/modelos';
import { construirQueryParams } from '../utilidades/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private httpService = inject(HttpClient);

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}cuentas/`;
  constructor() {}

  getPaginatedUsuarios(
    paginacion: PaginacionDTO
  ): Observable<HttpResponse<UsuarioDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpService.get<UsuarioDTO[]>(
      `${this.urlBase}listadoUsuarios`,
      {
        params: queryParams,
        observe: 'response',
      }
    );
  }

  hacerAdmin(email: string) {
    return this.httpService.post(`${this.urlBase}hacerAdmin`, { email });
  }

  removerAdmin(email: string) {
    return this.httpService.post(`${this.urlBase}removerAdmin`, { email });
  }

  estaLogueado(): boolean {
    if (typeof localStorage === 'undefined') return false;

    const token = localStorage.getItem(this.llaveToken);
    if (!token) return false;

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion!);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    return this.getCampoJWT(this.campoRol);
  }

  getCampoJWT(campo: string): string {
    if (typeof localStorage === 'undefined') return '';

    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }
  registrar(
    credenciales: CredencialesUsuarioDTO
  ): Observable<RespuestaAutenticacion> {
    return this.httpService
      .post<RespuestaAutenticacion>(`${this.urlBase}crear`, credenciales)
      .pipe(tap((respuesta) => this.guardarToken(respuesta)));
  }

  login(
    credenciales: CredencialesUsuarioDTO
  ): Observable<RespuestaAutenticacion> {
    return this.httpService
      .post<RespuestaAutenticacion>(`${this.urlBase}login`, credenciales)
      .pipe(tap((respuesta) => this.guardarToken(respuesta)));
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return '';

    return localStorage.getItem(this.llaveToken);
  }
}
