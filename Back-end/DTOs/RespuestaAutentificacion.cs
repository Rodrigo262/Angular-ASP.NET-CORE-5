using System;

namespace Backend.DTOs;

public class RespuestaAutentificacion
{
    public string? Token { get; set; }
    public DateTime Expiracion { get; set; }
}
