using System;

namespace Backend.DTOs;

public class PeliculasFiltrarDTO
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    internal PaginacionDTO PaginacionDTO
    {
        get => new PaginacionDTO() { Page = Page, PageSize = PageSize };
    }
    public string? Titulo { get; set; }
    public int GeneroId { get; set; }
    public bool EnCines { get; set; }
    public bool ProximosEstrenos { get; set; }
}
