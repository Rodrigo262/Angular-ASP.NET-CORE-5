using System.ComponentModel.DataAnnotations;

namespace Backend.Entidades;

public class Actor
{
    public int Id { get; set; }
    [Required]
    [StringLength(maximumLength: 200)]
    public string? Nombre { get; set; }
    public string? Biografia { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public string? Foto { get; set; }

    public required List<PeliculasActores> PeliculasActores { get; set; }

}
