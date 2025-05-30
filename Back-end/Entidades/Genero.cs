using System.ComponentModel.DataAnnotations;
using Backend.Validaciones;

namespace Backend.Entidades;

public class Genero
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(maximumLength: 50)]
    [FirstLetterUpperCase]
    public string? Nombre { get; set; }

    public required List<PeliculasGeneros> PeliculasGeneros { get; set; }

}
