using System;

namespace Backend.Servicios;

public interface IServicioUsuarios
{
    Task<string> GetUsuarioId();
}
