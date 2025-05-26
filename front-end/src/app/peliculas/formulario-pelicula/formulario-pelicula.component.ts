import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultipleSelectorModel } from '../../utilidades/selector-multiple/MultipleselectorModel';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrl: './formulario-pelicula.component.css',
})
export class FormularioPeliculaComponent {
  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: PeliculaDTO;

  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  generosNoSeleccionados: MultipleSelectorModel[] = [
    {
      llave: 1,
      valor: 'Drama',
    },
    {
      llave: 2,
      valor: 'Comedia',
    },
    {
      llave: 3,
      valor: 'Terror',
    },
  ];

  generosSeleccionados: MultipleSelectorModel[] = [];

  cinesNoSeleccionados: MultipleSelectorModel[] = [
    {
      llave: 1,
      valor: 'Cine1',
    },
    {
      llave: 2,
      valor: 'Cine2',
    },
    {
      llave: 3,
      valor: 'Cine3',
    },
  ];

  cinesSeleccionados: MultipleSelectorModel[] = [];

  form = this.formBuilder.group({
    titulo: ['', Validators.required],
    resumen: new FormControl<string | null>(null),
    enCines: false,
    trailer: new FormControl<string | null>(null),
    fechaLanzamiento: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    poster: new FormControl<File | string | null>(null),
    generosId: new FormControl<number[] | null>(null),
    cinesId: new FormControl<number[] | null>(null),
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }
  guardarCambios(): void {
    if (!this.form.valid) return;
    const generosId = this.generosSeleccionados.map((val) => val.llave);
    this.form.get('generosId')?.setValue(generosId);

    const cinesId = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('cinesId')?.setValue(cinesId);

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
