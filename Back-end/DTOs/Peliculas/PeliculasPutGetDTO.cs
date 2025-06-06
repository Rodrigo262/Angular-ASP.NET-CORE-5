using System;
using Backend.DTOs.Peliculas;

namespace Backend.DTOs;

public class PeliculasPutGetDTO
{
    public PeliculaDTO? PeliculaDTO { get; set; }
    public List<GeneroDTO>? GenerosSeleccionados { get; set; }
    public List<GeneroDTO>? GenerosNoSeleccionados { get; set; }
    public List<CineDTO>? CinesSeleccionados { get; set; }
    public List<CineDTO>? CinesNoSeleccionados { get; set; }
    public List<PeliculaActorDTO> PeliculaActorDTO { get; set; }
}
