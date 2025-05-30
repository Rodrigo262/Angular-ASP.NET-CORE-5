import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CineCreacionDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrl: './formulario-cine.component.css',
})
export class FormularioCineComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: CineCreacionDTO;

  @Input()
  errores: string[] = [];

  @Output()
  posteoFormulario = new EventEmitter<CineCreacionDTO>();

  form = this.formBuilder.group({
    nombre: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit() {
    this.posteoFormulario.emit(this.form.value as CineCreacionDTO);
  }
}
