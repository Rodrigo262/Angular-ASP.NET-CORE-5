import { Component, Input } from '@angular/core';
import { MultipleSelectorModel } from './MultipleselectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css',
})
export class SelectorMultipleComponent {
  @Input()
  Seleccionados: MultipleSelectorModel[] = [];

  @Input()
  NoSeleccionados: MultipleSelectorModel[] = [];

  seleccionar(item: MultipleSelectorModel, index: number) {
    this.Seleccionados.push(item);
    this.NoSeleccionados.splice(index, 1);
  }

  deseleccionar(item: MultipleSelectorModel, index: number) {
    this.NoSeleccionados.push(item);
    this.Seleccionados.splice(index, 1);
  }

  seleccionarTodo() {
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados = [];
  }
  deseleccionarTodo() {
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
  }
}
