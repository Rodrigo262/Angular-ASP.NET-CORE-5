import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';

import { IndiceActoresComponent } from './actores/indice-actores/indice-actores.component';
import { CrearActorComponent } from './actores/crear-actor/crear-actor.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';

import { IndiceCinesComponent } from './cines/indice-cines/indice-cines.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';

import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FiltroPeliculasComponent } from './peliculas/filtro-peliculas/filtro-peliculas.component';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { esAdminGuard } from './es-admin.guard';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { LoginComponent } from './seguridad/login/login.component';
import { IndiceUsuariosComponent } from './seguridad/indice-usuarios/indice-usuarios.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

  {
    path: 'generos',
    component: IndiceGenerosComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'generos/crear',
    component: CrearGeneroComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'generos/editar/:id',
    component: EditarGeneroComponent,
    canActivate: [esAdminGuard],
  },

  {
    path: 'actores',
    component: IndiceActoresComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'actores/crear',
    component: CrearActorComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'actores/editar/:id',
    component: EditarActorComponent,
    canActivate: [esAdminGuard],
  },

  {
    path: 'cines',
    component: IndiceCinesComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'cines/crear',
    component: CrearCineComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'cines/editar/:id',
    component: EditarCineComponent,
    canActivate: [esAdminGuard],
  },

  {
    path: 'peliculas/crear',
    component: CrearPeliculaComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'peliculas/editar/:id',
    component: EditarPeliculaComponent,
    canActivate: [esAdminGuard],
  },
  {
    path: 'peliculas/buscar',
    component: FiltroPeliculasComponent,
  },
  { path: 'pelicula/:id', component: DetallePeliculaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'usuarios',
    component: IndiceUsuariosComponent,
    canActivate: [esAdminGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
