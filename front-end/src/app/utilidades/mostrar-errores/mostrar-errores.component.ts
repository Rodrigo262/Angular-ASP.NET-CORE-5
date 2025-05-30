import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-errores',
  templateUrl: './mostrar-errores.component.html',
  styleUrl: './mostrar-errores.component.css',
})
export class MostrarErroresComponent {
  @Input()
  errores: string[] = [];
}
