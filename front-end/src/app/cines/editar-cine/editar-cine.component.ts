import { Component, inject } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cine';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css',
})
export class EditarCineComponent {
  private router = inject(Router);
  private cinesService = inject(CinesService);
  private activedRoute = inject(ActivatedRoute);

  modelo!: CineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.cinesService.GetById(params['id']).subscribe({
        next: (modelo) => {
          this.modelo = modelo;
        },
        error: (errores) => {
          this.router.navigate(['/cines']);
        },
      });
    });
  }

  guardarCambios(cine: CineCreacionDTO): void {
    this.cinesService.Put(this.modelo.id, cine).subscribe({
      next: () => {
        this.router.navigate(['/cines']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
