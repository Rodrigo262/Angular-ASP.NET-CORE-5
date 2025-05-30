using System;

namespace Backend.DTOs;

public class LandingPageDTO
{
    public List<PeliculaDTO>? EnCines { get; set; }
    public List<PeliculaDTO>? ProximosEstrenos { get; set; }
}
