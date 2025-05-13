import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.peliculasEnCines = [];
    setTimeout(() => {
      this.peliculasEnCines = [
        {
          titulo: 'Spiderman',
          fechaLanzamiento: new Date(),
          precio: 1000,
        },
        {
          titulo: 'Spiderman 2',
          fechaLanzamiento: new Date(),
          precio: 400,
        },
        {
          titulo: 'Spiderman 3',
          fechaLanzamiento: new Date(),
          precio: 1500,
        },
      ];
    }, 2000);
  }

  title = 'front-end';

  peliculasEnCines: any;
  peliculasProximosEstrenos = [
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
