using System.ComponentModel.DataAnnotations;
using NetTopologySuite.Geometries;

namespace Backend.Entidades;

public class Cine
{
    public int Id { get; set; }

    [Required]
    [StringLength(maximumLength: 75)]
    public string? Nombre { get; set; }

    public Point? Location { get; set; }

    public required List<PeliculasCines> PeliculasCines { get; set; }

}
