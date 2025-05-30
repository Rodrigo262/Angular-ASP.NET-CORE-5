import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../utilidades/validadores/primeraLetraMayuscula';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FiltroPeliculas, PeliculaDTO } from '../pelicula';
import { GenerosService } from '../../generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PaginacionDTO } from '../../utilidades/modelos/modelos';
import { GeneroDTO } from '../../generos/genero';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css',
})
export class FiltroPeliculasComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  private generosService = inject(GenerosService);
  private peliculasServices = inject(PeliculasService);

  paginacion: PaginacionDTO = { page: 1, pageSize: 5 };

  totalItems!: number;
  peliculas!: PeliculaDTO[];
  generos!: GeneroDTO[];

  peliculasOriginal: PeliculaDTO[] = this.peliculas;

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  });

  ngOnInit(): void {
    this.generosService.GetAll().subscribe((generos) => {
      this.generos = generos;

      this.leerValoresUrl();
      this.buscarPeliculas(this.form.value as FiltroPeliculas);

      this.form.valueChanges.subscribe((valores) => {
        this.peliculas = this.peliculasOriginal;
        this.buscarPeliculas(valores as FiltroPeliculas);
        this.escribirParametrosBusquedaUrl(valores as FiltroPeliculas);
      });
    });
  }

  private escribirParametrosBusquedaUrl(filtroPeliculas: FiltroPeliculas) {
    var queryStrings = [];

    if (filtroPeliculas.titulo) {
      queryStrings.push(`titulo=${filtroPeliculas.titulo}`);
    }
    if (filtroPeliculas.generoId !== 0) {
      queryStrings.push(`generoId=${filtroPeliculas.generoId}`);
    }
    if (filtroPeliculas.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${filtroPeliculas.proximosEstrenos}`);
    }
    if (filtroPeliculas.enCines) {
      queryStrings.push(`enCines=${filtroPeliculas.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  private leerValoresUrl() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var object: any = {};

      if (params['titulo']) {
        object.titulo = params['titulo'];
      }
      if (params['generoId']) {
        object.generoId = params['generoId'];
      }
      if (params['proximosEstrenos']) {
        object.proximosEstrenos = params['proximosEstrenos'];
      }
      if (params['enCines']) {
        object.enCines = params['enCines'];
      }

      this.form.patchValue(object);
    });
  }

  limpiar(): void {
    this.form.patchValue({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false,
    });
  }

  buscarPeliculas(valores: FiltroPeliculas) {
    valores.page = this.paginacion.page;
    valores.pageSize = this.paginacion.pageSize;

    this.peliculasServices.Filtrar(valores).subscribe({
      next: (respuesta) => {
        this.peliculas = respuesta.body as PeliculaDTO[];
        const cabecera = respuesta.headers.get('TotalItems') as string;
        this.totalItems = parseInt(cabecera);
      },
    });
  }

  updatePagination(datos: PageEvent) {
    this.paginacion = { page: datos.pageIndex + 1, pageSize: datos.pageSize };
    this.buscarPeliculas(this.form.value as FiltroPeliculas);
  }
}
