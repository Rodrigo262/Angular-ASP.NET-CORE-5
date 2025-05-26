import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActorCreacionDto, ActorDTO } from '../actor';
import { fechaNoPuedeSerFutura } from '../../utilidades/validadores/fechaNoPuedeSerFutura';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css',
})
export class FormularioActoresComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: ActorDTO;

  @Output()
  posteoFormulario = new EventEmitter<ActorCreacionDto>();

  form = this.formBuilder.group({
    nombre: ['', Validators.required],
    fechaNacimiento: new FormControl<Date | null>(null, {
      validators: [Validators.required, fechaNoPuedeSerFutura()],
    }),
    foto: new FormControl<File | string | null>(null),
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const actor = this.form.value as ActorCreacionDto;

    this.posteoFormulario.emit(actor);
  }

  archivoSeleccionado(file: File) {
    this.form.controls.foto.setValue(file);
  }
}
