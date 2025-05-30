import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActorCreacionDTO, ActorDTO } from '../actor';
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

  @Input()
  errores: string[] = [];

  @Output()
  posteoFormulario = new EventEmitter<ActorCreacionDTO>();

  imagenCambiada: boolean = false;

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

    if (!this.imagenCambiada) {
      this.form.patchValue({ foto: null });
    }
    const actor = this.form.value as ActorCreacionDTO;
    this.posteoFormulario.emit(actor);
  }

  archivoSeleccionado(file: File) {
    this.imagenCambiada = true;
    this.form.controls.foto.setValue(file);
  }
}
