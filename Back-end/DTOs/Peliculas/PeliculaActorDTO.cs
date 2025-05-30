using System;

namespace Backend.DTOs.Peliculas;

public class PeliculaActorDTO
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Foto { get; set; }

    public string? Personaje { get; set; }

    public int Orden { get; set; }
}
