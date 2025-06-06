import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { GeneroDTO } from '../../generos/genero';
import { PaginacionDTO } from '../../utilidades/modelos/modelos';
import { UsuarioDTO } from '../seguridad';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrl: './indice-usuarios.component.css',
})
export class IndiceUsuariosComponent {
  private seguridadService = inject(SeguridadService);

  usuarios: UsuarioDTO[] = [];

  columnasAMostrar = ['email', 'acciones'];
  ngOnInit(): void {
    this.cargarRegistros();
  }

  paginacion: PaginacionDTO = { page: 1, pageSize: 5 };
  totalItems!: number;
  cargarRegistros() {
    this.seguridadService
      .getPaginatedUsuarios(this.paginacion)
      .subscribe((respuesta: HttpResponse<UsuarioDTO[]>) => {
        this.usuarios = respuesta.body as UsuarioDTO[];
        const cabecera = respuesta.headers.get('TotalItems') as string;
        this.totalItems = parseInt(cabecera);
      });
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { page: datos.pageIndex + 1, pageSize: datos.pageSize };
    this.cargarRegistros();
  }

  hacerAdmin(email: string) {
    this.seguridadService.hacerAdmin(email).subscribe(() => {
      this.cargarRegistros();
    });
  }
  removerAdmin(email: string) {
    this.seguridadService.removerAdmin(email).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
