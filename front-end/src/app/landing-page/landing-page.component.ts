import { Component, inject, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas/peliculas.service';
import { PeliculaDTO, PeliculasLandingDTO } from '../peliculas/pelicula';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  private peliculasServices = inject(PeliculasService);

  constructor() {
    this.cargarPelicula();
  }

  peliculasEnCines!: any[];

  peliculasProximosEstrenos!: any[];

  cargarPelicula() {
    this.loadData();
  }

  loadData() {
    this.peliculasServices.GetLanding().subscribe((modelo) => {
      this.peliculasEnCines = modelo.enCines;
      this.peliculasProximosEstrenos = modelo.proximosEstrenos;
    });
  }

  ngOnInit(): void {}

  title = 'front-end';

  manejarRated(voto: number): void {
    alert(voto);
  }
  borrado() {
    this.loadData();
  }
}
