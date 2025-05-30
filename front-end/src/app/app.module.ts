import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoPeliculasComponent } from './peliculas/listado-peliculas/listado-peliculas.component';
import { ListadoGenericoComponent } from './utilidades/listado-generico/listado-generico.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { RatingComponent } from './utilidades/rating/rating.component';
import { MapaComponent } from './utilidades/mapa/mapa.component';
import { InputImgComponent } from './utilidades/input-img/input-img.component';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { FormularioGeneroComponent } from './generos/formulario-genero/formulario-genero.component';

import { CrearActorComponent } from './actores/crear-actor/crear-actor.component';
import { IndiceActoresComponent } from './actores/indice-actores/indice-actores.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { FormularioActoresComponent } from './actores/formulario-actores/formulario-actores.component';

import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { IndiceCinesComponent } from './cines/indice-cines/indice-cines.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { FormularioCineComponent } from './cines/formulario-cine/formulario-cine.component';

import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FiltroPeliculasComponent } from './peliculas/filtro-peliculas/filtro-peliculas.component';
import { FormularioPeliculaComponent } from './peliculas/formulario-pelicula/formulario-pelicula.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { SelectorMultipleComponent } from './utilidades/selector-multiple/selector-multiple.component';
import { AutocompleteActoresComponent } from './actores/autocomplete-actores/autocomplete-actores.component';

import { MostrarErroresComponent } from './utilidades/mostrar-errores/mostrar-errores.component';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { AutorizadoComponent } from './seguridad/autorizado/autorizado.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoPeliculasComponent,
    ListadoGenericoComponent,
    MenuComponent,
    RatingComponent,
    LandingPageComponent,
    IndiceGenerosComponent,
    CrearGeneroComponent,
    IndiceActoresComponent,
    CrearActorComponent,
    CrearCineComponent,
    IndiceCinesComponent,
    EditarActorComponent,
    EditarGeneroComponent,
    EditarCineComponent,
    EditarPeliculaComponent,
    FormularioGeneroComponent,
    FiltroPeliculasComponent,
    FormularioActoresComponent,
    InputImgComponent,
    FormularioCineComponent,
    MapaComponent,
    FormularioPeliculaComponent,
    CrearPeliculaComponent,
    SelectorMultipleComponent,
    AutocompleteActoresComponent,
    MostrarErroresComponent,
    DetallePeliculaComponent,
    AutorizadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
