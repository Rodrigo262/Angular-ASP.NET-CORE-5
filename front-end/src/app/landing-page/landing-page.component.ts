import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  ngOnInit(): void {
    this.peliculasEnCines = [
      {
        titulo: 'Spiderman',
        fechaLanzamiento: new Date(),
        precio: 1000,
        poster:
          'https://m.media-amazon.com/images/M/MV5BZGE3OThlNTUtYThiOC00NzliLTkyMmMtMGNkNGMzNDJmOGI1XkEyXkFqcGc@._V1_FMjpg_UX600_.jpg',
      },
      {
        titulo: 'Hulk',
        fechaLanzamiento: new Date(),
        precio: 400,
        poster:
          'https://m.media-amazon.com/images/M/MV5BNTQxMmVlMTItMGFjYi00MTc2LWE5MzMtYjFhZWJmZGY0MTY5XkEyXkFqcGc@._V1_FMjpg_UX590_.jpg',
      },
      {
        titulo: 'Avengers',
        fechaLanzamiento: new Date(),
        precio: 1500,
        poster:
          'https://m.media-amazon.com/images/M/MV5BZGM5MTFlYTMtMGU4NC00YzUzLThhY2UtM2IxZGI5MTlhYWZkXkEyXkFqcGc@._V1_.jpg',
      },
    ];

    this.peliculasProximosEstrenos = [
      {
        titulo: 'Avengers',
        fechaLanzamiento: new Date(),
        precio: 1000,
      },
      {
        titulo: 'Thor',
        fechaLanzamiento: new Date(),
        precio: 400,
      },
      {
        titulo: 'Hulk',
        fechaLanzamiento: new Date(),
        precio: 1500,
      },
    ];
  }

  title = 'front-end';
  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];

  manejarRated(voto: number): void {
    alert(voto);
  }
}
