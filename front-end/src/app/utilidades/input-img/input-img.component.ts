import { Component, EventEmitter, Output, Input, input } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent {
  @Input({ required: true })
  titulo!: string;

  @Input()
  urlImagenActual?: string;

  @Output()
  archivoSeleccionado = new EventEmitter<File>();

  imagenBase64?: string;

  change(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      toBase64(file)
        .then((valor: string) => (this.imagenBase64 = valor))
        .catch((error) => console.log(error));

      this.archivoSeleccionado.emit(file);
      this.urlImagenActual = undefined;
    }
  }
}
