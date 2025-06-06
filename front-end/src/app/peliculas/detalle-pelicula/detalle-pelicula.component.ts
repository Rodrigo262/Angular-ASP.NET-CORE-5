import { RatingService } from './../../rating/rating.service';
import { Component, inject, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDTO } from '../pelicula';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeguridadService } from '../../seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css',
})
export class DetallePeliculaComponent implements OnInit {
  private peliculasService = inject(PeliculasService);
  private activatedRoute = inject(ActivatedRoute);
  private seguridadService = inject(SeguridadService);
  private ratingService = inject(RatingService);
  private sanitizer = inject(DomSanitizer);

  pelicula!: PeliculaDTO;
  fechaLanzamiento!: Date;
  trailerURL!: SafeResourceUrl;
  //coordenadas:

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculasService.GetById(params['id']).subscribe({
        next: (pelicula) => {
          this.pelicula = pelicula;
          this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
          this.trailerURL = this.generarURLYTEmbed(this.pelicula.trailer);
          //faltarían las coordenadas.
        },
        error: (errores) => {},
      });
    });
  }

  generarURLYTEmbed(url: any): SafeResourceUrl {
    if (!url) return '';

    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&');
    if (posicionAmpersand !== -1) {
      video_id = video_id.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video_id}`
    );
  }

  puntuar(puntuacion: number) {
    if (!this.seguridadService.estaLogueado())
      Swal.fire(
        'Error',
        'Debes loguearte para poder votar por una película',
        'error'
      );

    this.ratingService.rate(this.pelicula.id, puntuacion).subscribe(() => {
      Swal.fire('Exitoso', 'Su voto ha sido recibido', 'success');
    });
  }
}
