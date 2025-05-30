using System.ComponentModel.DataAnnotations;

namespace Backend.Entidades;

public class PeliculasActores
{
    public int PeliculaId { get; set; }
    public int ActorId { get; set; }
    [StringLength(300)]
    public string? Personaje { get; set; }
    public Pelicula? Pelicula { get; set; }
    public Actor? Actor { get; set; }
    public int Order { get; set; }
}
