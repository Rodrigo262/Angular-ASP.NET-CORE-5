using System;

namespace Backend.Entidades;

public class PeliculasGeneros
{
    public int PeliculaId { get; set; }
    public required int GeneroId { get; set; }
    public Pelicula? Pelicula { get; set; }
    public Genero? Genero { get; set; }

}
