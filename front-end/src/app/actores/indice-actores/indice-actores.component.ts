import { Component, inject } from '@angular/core';
import { ActoresService } from '../actores.service';
import { ActorDTO } from '../actor';
import { PaginacionDTO } from '../../utilidades/modelos/modelos';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css',
})
export class IndiceActoresComponent {
  private actoresService = inject(ActoresService);

  actores: ActorDTO[] = [];

  columnasAMostrar = ['id', 'nombre', 'acciones'];
  ngOnInit(): void {
    this.cargarRegistros();
  }

  paginacion: PaginacionDTO = { page: 1, pageSize: 5 };
  totalItems!: number;
  cargarRegistros() {
    this.actoresService
      .GetPaginated(this.paginacion)
      .subscribe((respuesta: HttpResponse<ActorDTO[]>) => {
        this.actores = respuesta.body as ActorDTO[];
        const cabecera = respuesta.headers.get('TotalItems') as string;
        this.totalItems = parseInt(cabecera);
      });
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { page: datos.pageIndex + 1, pageSize: datos.pageSize };
    this.cargarRegistros();
  }

  borrar(id: number) {
    this.actoresService.Delete(id).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
