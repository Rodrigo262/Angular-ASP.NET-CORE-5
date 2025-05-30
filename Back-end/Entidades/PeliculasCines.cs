using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entidades;

public class PeliculasCines
{
    public int PeliculaId { get; set; }
    public int CineId { get; set; }
    public Pelicula? Pelicula { get; set; }
    public Cine? Cine { get; set; }

    [StringLength(maximumLength: 100)]
    public string? Personaje { get; set; }
    public int Orden { get; set; }
}
