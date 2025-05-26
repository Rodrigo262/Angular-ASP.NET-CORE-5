export interface ActorDTO {
  nombre: string;
  fechaNacimiento: Date;
  foto?: string;
}

export interface ActorCreacionDto {
  nombre: string;
  fechaNacimiento: Date;
  foto?: File;
}

export interface ActorAutoCompleteDto {
  id: number;
  nombre: string;
  personaje: string;
  foto: string;
}
