import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActorAutoCompleteDTO } from '../actor';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css',
})
export class AutocompleteActoresComponent implements OnInit {
  private actoresServices = inject(ActoresService);
  control = new FormControl();

  actores: ActorAutoCompleteDTO[] = [];

  errores: string[] = [];

  @Input()
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<ActorAutoCompleteDTO>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((valor) => {
      if (typeof valor === 'string' && valor) {
        this.actoresServices.GetByName(valor).subscribe({
          next: (actores) => {
            this.actores = actores;
          },
          error: (errors) => (this.errores = parsearErroresAPI(errors)),
        });
      } else {
        this.actores = [];
      }
    });
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

  eliminar(actor: ActorAutoCompleteDTO) {
    const indice = this.actoresSeleccionados.findIndex(
      (a: ActorAutoCompleteDTO) => a.id === actor.id
    );
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }
}
