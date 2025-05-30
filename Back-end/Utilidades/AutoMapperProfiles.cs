using AutoMapper;
using Backend.DTOs;
using Backend.DTOs.Peliculas;
using Backend.Entidades;
using NetTopologySuite.Geometries;

namespace Backend.Utilidades;

public class AutoMapperProfiles : Profile
{

    public AutoMapperProfiles(GeometryFactory geometryFactory)
    {
        ConfigureMapGeneros();
        ConfigureMapActores();
        ConfigureMapCines(geometryFactory);
        ConfigureMapPeliculas();
    }

    private void ConfigureMapGeneros()
    {
        CreateMap<Genero, GeneroDTO>().ReverseMap();
        CreateMap<GeneroCreacionDTO, Genero>();
    }

    private void ConfigureMapActores()
    {

        CreateMap<Actor, ActorDTO>().ReverseMap();
        CreateMap<ActorCreacionDTO, Actor>()
            .ForMember(x => x.Foto, options => options.Ignore());
        CreateMap<Actor, PeliculaActorDTO>();

    }

    public void ConfigureMapCines(GeometryFactory geometryFactory)
    {
        CreateMap<Cine, CineDTO>().ReverseMap();
        CreateMap<CineCreacionDTO, Cine>();
        //.ForMember(x => x.Latitude, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
        //.ForMember(x=> x.Longitude, dto=> dto.MapFrom(campo => campo.Ubicacion.X));
    }

    private void ConfigureMapPeliculas()
    {
        CreateMap<PeliculaCreacionDTO, Pelicula>()
            .ForMember(x => x.Poster, options => options.Ignore())
            .ForMember(x => x.PeliculasGeneros, options => options.MapFrom(MapPeliculasGeneros))
            .ForMember(x => x.PeliculasCines, options => options.MapFrom(MapPeliculasCines))
            .ForMember(x => x.PeliculasActores, options => options.MapFrom(MapPeliculasActores));

        CreateMap<Pelicula, PeliculaDTO>()
            .ForMember(x => x.Generos, options => options.MapFrom(MapearPeliculaGenero))
            .ForMember(x => x.Cines, options => options.MapFrom(MapearPeliculaCine))
            .ForMember(x => x.Actores, options => options.MapFrom(MapearPeliculaActor));
    }

    private List<GeneroDTO> MapearPeliculaGenero(Pelicula pelicula, PeliculaDTO peliculaDTO)
    {

        var resultado = new List<GeneroDTO>();

        if (pelicula.PeliculasGeneros is not null)
        {
            foreach (var genero in pelicula.PeliculasGeneros)
            {
                resultado.Add(new GeneroDTO() { Id = genero.GeneroId, Nombre = genero.Genero.Nombre, });
            }
        }

        return resultado;
    }
    private List<CineDTO> MapearPeliculaCine(Pelicula pelicula, PeliculaDTO peliculaDTO)
    {

        var resultado = new List<CineDTO>();

        if (pelicula.PeliculasCines is not null)
        {
            foreach (var peliculaCines in pelicula.PeliculasCines)
            {
                resultado.Add(new CineDTO()
                {
                    Id = peliculaCines.CineId,
                    Nombre = peliculaCines.Cine.Nombre,
                    //Latitude = peliculaCines.Cine.Location.Y,
                    //Longitude = peliculaCines.Cine.Location.X,
                });
            }
        }

        return resultado;
    }
    private List<PeliculaActorDTO> MapearPeliculaActor(Pelicula pelicula, PeliculaDTO peliculaDTO)
    {

        var resultado = new List<PeliculaActorDTO>();

        if (pelicula.PeliculasActores is not null)
        {
            foreach (var actorPelicula in pelicula.PeliculasActores)
            {
                resultado.Add(new PeliculaActorDTO()
                {
                    Id = actorPelicula.ActorId,
                    Nombre = actorPelicula.Actor.Nombre,
                    Foto = actorPelicula.Actor.Foto,
                    Orden = actorPelicula.Order,
                    Personaje = actorPelicula.Personaje
                });
            }
        }

        return resultado;
    }

    private List<PeliculasActores> MapPeliculasActores(
        PeliculaCreacionDTO peliculaCreacionDTO,
        Pelicula pelicula)
    {
        var resultado = new List<PeliculasActores>();

        if (peliculaCreacionDTO.Actores == null) return resultado;

        foreach (var actor in peliculaCreacionDTO.Actores)
        {
            resultado.Add(new PeliculasActores() { ActorId = actor.Id, Personaje = actor?.Personaje });
        }
        return resultado;
    }

    private List<PeliculasGeneros> MapPeliculasGeneros(
        PeliculaCreacionDTO peliculaCreacionDTO,
        Pelicula pelicula)
    {
        var resultado = new List<PeliculasGeneros>();

        if (peliculaCreacionDTO.GenerosIds == null) return resultado;

        foreach (var id in peliculaCreacionDTO.GenerosIds)
        {
            resultado.Add(new PeliculasGeneros() { GeneroId = id });
        }
        return resultado;
    }

    private List<PeliculasCines> MapPeliculasCines(
        PeliculaCreacionDTO peliculaCreacionDTO,
        Pelicula pelicula)
    {
        var resultado = new List<PeliculasCines>();

        if (peliculaCreacionDTO.CinesIds == null) return resultado;

        foreach (var id in peliculaCreacionDTO.CinesIds)
        {
            resultado.Add(new PeliculasCines() { CineId = id });
        }
        return resultado;
    }
}
