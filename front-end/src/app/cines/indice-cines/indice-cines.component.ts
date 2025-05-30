import { Component, inject } from '@angular/core';
import { CinesService } from '../cines.service';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../utilidades/modelos/modelos';
import { PageEvent } from '@angular/material/paginator';
import { CineDTO } from '../cine';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrl: './indice-cines.component.css',
})
export class IndiceCinesComponent {
  private cinesService = inject(CinesService);

  cines: CineDTO[] = [];

  columnasAMostrar = ['id', 'nombre', 'acciones'];
  ngOnInit(): void {
    this.cargarRegistros();
  }

  paginacion: PaginacionDTO = { page: 1, pageSize: 5 };
  totalItems!: number;
  cargarRegistros() {
    this.cinesService
      .GetPaginated(this.paginacion)
      .subscribe((respuesta: HttpResponse<CineDTO[]>) => {
        this.cines = respuesta.body as CineDTO[];
        const cabecera = respuesta.headers.get('TotalItems') as string;
        this.totalItems = parseInt(cabecera);
      });
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { page: datos.pageIndex + 1, pageSize: datos.pageSize };
    this.cargarRegistros();
  }

  borrar(id: number) {
    this.cinesService.Delete(id).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
