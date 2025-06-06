export interface CredencialesUsuarioDTO {
  email: string;
  password: string;
}

export interface RespuestaAutenticacion {
  token: string;
  expiracion: Date;
}

export interface UsuarioDTO {
  id: string;
  email: string;
}
