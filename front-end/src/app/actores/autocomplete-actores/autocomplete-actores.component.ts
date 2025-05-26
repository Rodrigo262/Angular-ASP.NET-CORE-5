import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActorAutoCompleteDto } from '../actor';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css',
})
export class AutocompleteActoresComponent implements OnInit {
  control = new FormControl();

  actores: ActorAutoCompleteDto[] = [
    {
      id: 1,
      nombre: 'Tom Cruise',
      foto: 'https://m.media-amazon.com/images/M/MV5BMmU1YWU1NmMtMjAyMi00MjFiLWFmZmUtOTc1ZjI5ODkxYmQyXkEyXkFqcGc@._V1_.jpg',
      personaje: '',
    },
    {
      id: 2,
      nombre: 'Tom Holland',
      foto: 'https://m.media-amazon.com/images/M/MV5BYzU3NWRhMjgtNmNmMS00YjQ1LWIyYzgtYzdkYjRjNWEzM2E3XkEyXkFqcGc@._V1_.jpg',
      personaje: '',
    },
    {
      id: 3,
      nombre: 'Tom Hanks',
      foto: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg',
      personaje: '',
    },
  ];

  actoresOriginal = this.actores;

  @Input()
  actoresSeleccionados: ActorAutoCompleteDto[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<ActorAutoCompleteDto>;

  ngOnInit(): void {
    // this.control.valueChanges.subscribe((valor) => {
    //   this.actores = this.actoresOriginal;
    //   this.actores = this.actores.filter(
    //     (actor) => actor.nombre.indexOf(valor!) !== -1
    //   );
    // });
  }

  actorSeleccionado(event: MatAutocompleteSelectedEvent) {
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined) {
      this.table.renderRows();
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table !== undefined) {
      this.table.renderRows();
    }

    //if()
  }

  finalizarArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(
      (actor) => actor === event.item.data
    );

    moveItemInArray(
      this.actoresSeleccionados,
      indicePrevio,
      event.currentIndex
    );
    this.table.renderRows();
  }

  eliminar(actor: ActorAutoCompleteDto) {
    const indice = this.actoresSeleccionados.findIndex(
      (a: ActorAutoCompleteDto) => a.id === actor.id
    );
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }
}
