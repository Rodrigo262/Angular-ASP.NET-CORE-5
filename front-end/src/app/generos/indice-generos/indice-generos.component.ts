import { Component, inject, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { GeneroDTO } from '../genero';
import { PaginacionDTO } from '../../utilidades/modelos/modelos';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css',
})
export class IndiceGenerosComponent implements OnInit {
  private generosServices = inject(GenerosService);

  generos: GeneroDTO[] = [];

  columnasAMostrar = ['id', 'nombre', 'acciones'];
  ngOnInit(): void {
    this.cargarRegistros();
  }

  paginacion: PaginacionDTO = { page: 1, pageSize: 5 };
  totalItems!: number;
  cargarRegistros() {
    this.generosServices
      .GetPaginated(this.paginacion)
      .subscribe((respuesta: HttpResponse<GeneroDTO[]>) => {
        this.generos = respuesta.body as GeneroDTO[];
        const cabecera = respuesta.headers.get('TotalItems') as string;
        this.totalItems = parseInt(cabecera);
      });
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { page: datos.pageIndex + 1, pageSize: datos.pageSize };
    this.cargarRegistros();
  }

  borrar(id: number) {
    this.generosServices.Delete(id).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
