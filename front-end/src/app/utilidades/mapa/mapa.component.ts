import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import {
//   icon,
//   latLng,
//   Marker,
//   tileLayer,
//   MarkerOptions,
//   marker,
// } from 'leaflet';
// import { Coordenada } from './Coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements OnInit {
  //   options = {
  //     layers: [
  //       tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         maxZoom: 18,
  //         attribution: '...',
  //       }),
  //     ],
  //     zoom: 5,
  //     center: latLng(46.879966, -121.726909),
  //   };

  //   capas: Marker<any>[] = [];

  //   markerOptions: MarkerOptions = {
  //     icon: icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: 'assets/marker-icon.png',
  //       iconRetinaUrl: 'assets/marker-icon-2x.png',
  //       shadowUrl: 'assets/marker-shadow.png',
  //     }),
  //   };

  //   @Input()
  //   coordenadasIniciales: Coordenada[] = [];

  //   @Output()
  //   coordenadaSeleccionada = new EventEmitter<Coordenada>();

  ngOnInit(): void {
    //     this.capas = this.coordenadasIniciales.map((valor) => {
    //       const marcador = marker(
    //         [valor.latitud, valor.longitud],
    //         this.markerOptions
    //       );
    //       return marcador;
    //     });
  }
}
