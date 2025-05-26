import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fechaNoPuedeSerFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaEscogidaPorElUsuario = new Date(control.value);
    const hoy = new Date();

    if (fechaEscogidaPorElUsuario > hoy) {
      return {
        futuro: {
          mensaje: 'La fecha no puede ser futura',
        },
      };
    }
    return null;
  };
}
