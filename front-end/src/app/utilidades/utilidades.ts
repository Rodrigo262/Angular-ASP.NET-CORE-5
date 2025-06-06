export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.error) {
    if (typeof response.error == 'string') {
      resultado.push(response.error);
    } else if (Array.isArray(response.error)) {
      response.error.foreach((valor: any) => resultado.push(valor.description));
    } else {
      const mapaErrores = response.error.errors;
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0];
        arreglo[1].forEach((mensajeError: any) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }
  return resultado;
}

export function formatearFecha(date: Date) {
  console.log(date);
  const fecha = new Date(date);

  // Verificar que sea una fecha válida
  if (isNaN(fecha.getTime())) {
    console.warn('❌ Fecha inválida:', date);
    return '';
  }
  const formato = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formato.formatToParts(fecha);

  const day = parts.find((part) => part.type === 'day')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const year = parts.find((part) => part.type === 'year')?.value;

  return `${year}-${month}-${day}`;
}

export function extraerErrores(obj: any): string[] {
  const err = obj.error.errors;

  let mensajeError: string[] = [];

  for (let llave in err) {
    let campo = llave;
    const mensajeConCampos = err[llave].map(
      (mensaje: string) => `${campo}: ${mensaje}`
    );
    mensajeError = mensajeError.concat(mensajeConCampos);
  }
  return mensajeError;
}

export function extraerErroresEntity(obj: any): string[] {
  let mensajesDeError: string[] = [];

  for (let i = 0; i < obj.error.length; i++) {
    const element = obj.error[i];
    mensajesDeError.push(element.description);
  }
  return mensajesDeError;
}
