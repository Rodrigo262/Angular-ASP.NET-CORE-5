import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private httpService = inject(HttpClient);

  private apiURL = environment.apiURL;
  private urlBase = `${this.apiURL}ratings`;
  constructor() {}

  rate(peliculaId: number, puntuacion: number) {
    return this.httpService.post(this.urlBase, { peliculaId, puntuacion });
  }
}
