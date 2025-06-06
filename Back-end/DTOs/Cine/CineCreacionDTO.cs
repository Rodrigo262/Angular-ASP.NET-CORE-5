using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CineCreacionDTO
{
    [Required]
    [StringLength(maximumLength: 75)]
    public string? Nombre { get; set; }

    [Range(-90, 90)]
    public double? Latitude { get; set; }

    [Range(-180, 180)]
    public double? Longitude { get; set; }
}
