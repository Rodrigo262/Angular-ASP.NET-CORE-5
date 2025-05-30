import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../genero';
import { GenerosService } from '../generos.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
})
export class EditarGeneroComponent implements OnInit {
  private router = inject(Router);
  private generosService = inject(GenerosService);
  private activedRoute = inject(ActivatedRoute);

  modelo!: GeneroDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.generosService.GetById(params['id']).subscribe({
        next: (modelo) => {
          this.modelo = modelo;
        },
        error: (errores) => {
          this.router.navigate(['/generos']);
        },
      });
    });
  }

  guardarCambios(genero: GeneroCreacionDTO): void {
    this.generosService.Put(this.modelo.id, genero).subscribe({
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: (errors) => (this.errores = parsearErroresAPI(errors)),
    });
  }
}
