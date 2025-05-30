using System;
using System.ComponentModel.DataAnnotations;
using Backend.Utilidades;
using Microsoft.AspNetCore.Mvc;

namespace Backend.DTOs;

public class PeliculaCreacionDTO
{
    [Required]
    [StringLength(maximumLength: 300)]
    public required string Titulo { get; set; }

    public string? Resumen { get; set; }

    public string? Trailer { get; set; }

    public bool EnCines { get; set; }

    public DateTime FechaLanzamiento { get; set; }

    public IFormFile? Poster { get; set; }


    [ModelBinder(BinderType = typeof(TypeBinder<int>))]
    public List<int>? GenerosIds { get; set; }

    [ModelBinder(BinderType = typeof(TypeBinder<int>))]
    public List<int>? CinesIds { get; set; }

    [ModelBinder(BinderType = typeof(TypeBinder<ActorPeliculaCreacionDTO>))]
    public List<ActorPeliculaCreacionDTO>? Actores { get; set; }

}
