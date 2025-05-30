import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorCreacionDTO, ActorDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
})
export class EditarActorComponent implements OnInit {
  private router = inject(Router);
  private actoresService = inject(ActoresService);
  private activedRoute = inject(ActivatedRoute);

  modelo!: ActorDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.actoresService.GetById(params['id']).subscribe({
        next: (modelo) => {
          this.modelo = modelo;
        },
        error: () => {
          this.router.navigate(['/actores']);
        },
      });
    });
  }

  guardarCambios(actor: ActorCreacionDTO): void {
    this.actoresService.Put(this.modelo.id, actor).subscribe({
      next: () => {
        this.router.navigate(['/actores']);
      },
      error: (errors) => {
        this.errores = parsearErroresAPI(errors);
      },
    });
  }
}
