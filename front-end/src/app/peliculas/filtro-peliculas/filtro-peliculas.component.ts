import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../utilidades/validadores/primeraLetraMayuscula';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css',
})
export class FiltroPeliculasComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Comedia' },
    { id: 3, nombre: 'Acción' },
  ];

  peliculas = [
    {
      titulo: 'Spider-Man: Far From Home',
      enCines: true,
      proximosEstrenos: true,
      generos: [1],
      poster:
        'https://pics.filmaffinity.com/spider_man_far_from_home-339542528-mmed.jpg',
    },
    {
      titulo: 'Avengers: End Game',
      enCines: false,
      proximosEstrenos: true,
      generos: [2],
      poster:
        'https://pics.filmaffinity.com/avengers_endgame-135478227-mmed.jpg',
    },
    {
      titulo: 'Iron Man 3',
      enCines: true,
      proximosEstrenos: false,
      generos: [3],
      poster:
        'https://pics.filmaffinity.com/iron_man_3_aka_ironman_3-972235216-large.jpg',
    },
  ];

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresUrl();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe((valores) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaUrl();
    });
  }

  private escribirParametrosBusquedaUrl() {
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if (valoresFormulario.generoId !== 0) {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }
    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(
        `proximosEstrenos=${valoresFormulario.proximosEstrenos}`
      );
    }
    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
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
    //this.form.reset();
    this.form.patchValue(this.formularioOriginal);
  }

  buscarPeliculas(valores: any) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(
        (p) => p.titulo.indexOf(valores.titulo) !== -1
      );
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(
        (p) => p.generos.indexOf(valores.generoId) !== -1
      );
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter((p) => p.proximosEstrenos);
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter((p) => p.enCines);
    }
  }
}
