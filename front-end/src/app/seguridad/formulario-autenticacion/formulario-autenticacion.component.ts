import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CredencialesUsuarioDTO } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrl: './formulario-autenticacion.component.css',
})
export class FormularioAutenticacionComponent {
  private formBuilder = inject(FormBuilder);

  @Input()
  errores: string[] = [];

  @Input()
  titulo!: string;

  @Output()
  posteoFormulario: EventEmitter<CredencialesUsuarioDTO> =
    new EventEmitter<CredencialesUsuarioDTO>();

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
  });

  guardarCambios(): void {
    if (this.form.invalid) return;

    const credenciales = this.form.value as CredencialesUsuarioDTO;
    this.posteoFormulario.emit(credenciales);
  }

  getMessageErrorEmail(): string {
    var campo = this.form.controls.email;

    if (campo?.hasError('required')) {
      return 'El campo Email es requerido';
    }
    if (campo?.hasError('email')) {
      return 'El campo Email no es válido';
    }

    return '';
  }
}
