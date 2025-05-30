using System;
using System.ComponentModel.DataAnnotations;
using Backend.Validaciones;

namespace Backend.DTOs;

public class GeneroCreacionDTO
{
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(maximumLength: 50)]
    [FirstLetterUpperCase]
    public string Nombre { get; set; }
}
