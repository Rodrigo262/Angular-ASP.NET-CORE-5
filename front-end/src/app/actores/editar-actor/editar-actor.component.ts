import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorCreacionDto, ActorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
})
export class EditarActorComponent implements OnInit {
  modelo: ActorDTO = {
    nombre: 'Rodrigo',
    fechaNacimiento: new Date(),
    foto: 'https://m.media-amazon.com/images/M/MV5BNTczMzk1MjU1MV5BMl5BanBnXkFtZTcwNDk2MzAyMg@@._V1_.jpg',
  };
  constructor(private activedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      //alert(params['id']);
    });
  }

  guardarCambios(actor: ActorCreacionDto): void {}
}
