import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input()
  maximRating: number = 5;

  @Input()
  ratingSeleccionado: number = 0;

  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  maximoRatingArr: number[] = [];
  votado: boolean = false;
  ratingAnterior: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximRating).fill(0);
  }

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;
  }

  manejarMouseLeave(): void {
    if (this.ratingAnterior !== 0) {
      this.ratingSeleccionado = this.ratingAnterior;
    } else {
      this.ratingSeleccionado = 0;
    }
  }

  rate(index: number): void {
    this.ratingSeleccionado = index + 1;
    this.votado = true;
    this.ratingAnterior = this.ratingSeleccionado;
    this.rated.emit(this.ratingSeleccionado);
  }
}
