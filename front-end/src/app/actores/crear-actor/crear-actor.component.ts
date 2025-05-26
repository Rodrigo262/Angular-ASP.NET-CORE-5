import { Component, inject } from '@angular/core';
import { ActorCreacionDto } from '../actor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css',
})
export class CrearActorComponent {
  private router = inject(Router);

  guardarCambios(actor: ActorCreacionDto) {
    this.router.navigate(['/actores']);
  }
}
