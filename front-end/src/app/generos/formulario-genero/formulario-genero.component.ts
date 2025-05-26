import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../utilidades/validadores/primeraLetraMayuscula';
import { GeneroCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css',
})
export class FormularioGeneroComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  modelo?: GeneroCreacionDTO;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDTO>();

  form = this.formBuilder.group({
    nombre: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          primeraLetraMayuscula(),
        ],
      },
    ],
  });

  ObtenerErrorCampoNombre(): string {
    var campo = this.form.get('nombre');

    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }

    if (campo?.hasError('minlength')) {
      return 'La longitud mínima es de 3';
    }

    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  guardarCambios(): void {
    if (this.form.invalid) return;

    const genero = this.form.value as GeneroCreacionDTO;
    this.posteoFormulario.emit(genero);
  }
}
