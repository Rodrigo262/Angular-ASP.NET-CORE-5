import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css',
})
export class ListadoPeliculasComponent implements OnInit {
  @Input()
  peliculas: any;

  constructor() {}

  ngOnInit(): void {}
}
