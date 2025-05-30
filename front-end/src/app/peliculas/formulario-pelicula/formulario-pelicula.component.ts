import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultipleSelectorModel } from '../../utilidades/selector-multiple/MultipleselectorModel';
import { ActorAutoCompleteDTO } from '../../actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrl: './formulario-pelicula.component.css',
})
export class FormularioPeliculaComponent {
  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: PeliculaDTO;

  @Input()
  errores: string[] = [];

  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  @Input({ required: true })
  generosNoSeleccionados: MultipleSelectorModel[] = [];

  @Input({ required: true })
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input({ required: true })
  cinesNoSeleccionados: MultipleSelectorModel[] = [];

  @Input({ required: true })
  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input({ required: true })
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  form = this.formBuilder.group({
    titulo: ['', Validators.required],
    resumen: new FormControl<string | null>(null),
    enCines: false,
    trailer: new FormControl<string | null>(null),
    fechaLanzamiento: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    poster: new FormControl<File | string | null>(null),
    generosIds: new FormControl<number[] | null>(null),
    cinesIds: new FormControl<number[] | null>(null),
    actores: new FormControl<ActorAutoCompleteDTO[] | null>(null),
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }
  guardarCambios(): void {
    if (!this.form.valid) return;
    const generosId = this.generosSeleccionados.map((val) => val.llave);
    this.form.get('generosIds')?.setValue(generosId);

    const cinesId = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('cinesIds')?.setValue(cinesId);

    // const actores = this.actoresSeleccionados.map((val) => {
    //   return { id: val.id, personaje: val.personaje };
    // });
    this.form.get('actores')?.setValue(this.actoresSeleccionados);

    const pelicula = this.form.value as PeliculaCreacionDTO;
    this.posteoFormulario.emit(pelicula);
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('poster')?.setValue(archivo);
  }

  onChange(event: Event) {
    const valor = (event.target as HTMLTextAreaElement).value;
    this.form.get('resumen')?.setValue(valor);
  }
}
