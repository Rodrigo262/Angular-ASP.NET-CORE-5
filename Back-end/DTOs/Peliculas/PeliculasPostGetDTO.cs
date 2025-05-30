using System;
using Backend.Entidades;

namespace Backend.DTOs.Peliculas;

public class PeliculasPostGetDTO
{
    public List<GeneroDTO> Generos { get; set; }
    public List<CineDTO> Cines { get; set; }
}
