import { Component } from '@angular/core';
import { CineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css',
})
export class EditarCineComponent {
  modelo: CineDTO = { nombre: 'Capital' };
  guardarCambios() {}
}
