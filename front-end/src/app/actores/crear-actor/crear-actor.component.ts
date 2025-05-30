import { Component, inject } from '@angular/core';
import { ActorCreacionDTO } from '../actor';
import { Router } from '@angular/router';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css',
})
export class CrearActorComponent {
  private router = inject(Router);
  private actoresService = inject(ActoresService);

  errores: string[] = [];

  guardarCambios(actor: ActorCreacionDTO): void {
    this.actoresService.Post(actor).subscribe({
      next: () => {
        this.router.navigate(['/actores']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
