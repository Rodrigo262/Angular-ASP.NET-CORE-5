using System.Runtime.CompilerServices;
using AutoMapper;
using Backend.DTOs;
using Backend.DTOs.Peliculas;
using Backend.Entidades;
using Backend.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/peliculas")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly ILogger<PeliculasController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;


        private const string container = "peliculas";
        public PeliculasController(
            ILogger<PeliculasController> logger,
            ApplicationDbContext context,
            IMapper mapper,
            IStorageFiles storageFiles)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = mapper.Map<Pelicula>(peliculaCreacionDTO);

            if (peliculaCreacionDTO.Poster != null)
            {
                pelicula.Poster = await storageFiles.SaveFile(container, peliculaCreacionDTO.Poster);
            }
            OrderActores(pelicula);
            context.Add(pelicula);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("CinesGeneros")]
        public async Task<ActionResult<PeliculasPostGetDTO>> GetCinesGeneros()
        {
            var cines = await context.Cines.ToListAsync();
            var generos = await context.Generos.ToListAsync();

            var cinesDTO = mapper.Map<List<CineDTO>>(cines);
            var generosDTO = mapper.Map<List<GeneroDTO>>(generos);

            return new PeliculasPostGetDTO() { Cines = cinesDTO, Generos = generosDTO };
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PeliculaDTO>> Get(int id)
        {
            var pelicula = await context.Pelicula
                .Include(x => x.PeliculasGeneros).ThenInclude(x => x.Genero)
                .Include(x => x.PeliculasCines).ThenInclude(x => x.Cine)
                .Include(x => x.PeliculasActores).ThenInclude(x => x.Actor).FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula is null) return NotFound();

            var dto = mapper.Map<PeliculaDTO>(pelicula);
            dto.Actores = dto.Actores.OrderBy(x => x.Orden).ToList();

            return dto;
        }

        [HttpGet("Landing")]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var proximosEstrenos = await context.Pelicula
                .Where(x => x.FechaLanzamiento > DateTime.Today)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(6)
                .ToListAsync();

            var enCines = await context.Pelicula
                .Where(x => x.EnCines)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(6)
                .ToListAsync();

            var resultado = new LandingPageDTO()
            {
                ProximosEstrenos = mapper.Map<List<PeliculaDTO>>(proximosEstrenos),
                EnCines = mapper.Map<List<PeliculaDTO>>(enCines),
            };
            return resultado;
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<PeliculasPutGetDTO>> PutGet(int id)
        {
            var peliculaResult = await Get(id);
            if (peliculaResult.Result is NotFoundResult) return NotFound();

            var pelicula = peliculaResult.Value;

            var generoSeleccionadosIDs = pelicula?.Generos.Select(x => x.Id).ToList();
            var generosNoSeleccionados = await context.Generos.Where(x => !generoSeleccionadosIDs.Contains(x.Id)).ToListAsync();

            var cinesSeleccionadosIDs = pelicula?.Cines?.Select(x => x.Id).ToList();
            var cinesNoSeleccionados = await context.Cines.Where(x => !cinesSeleccionadosIDs.Contains(x.Id)).ToListAsync();

            return new PeliculasPutGetDTO()
            {
                PeliculaDTO = pelicula,
                GenerosSeleccionados = pelicula!.Generos,
                GenerosNoSeleccionados = mapper.Map<List<GeneroDTO>>(generosNoSeleccionados),
                CinesSeleccionados = pelicula.Cines,
                CinesNoSeleccionados = mapper.Map<List<CineDTO>>(cinesNoSeleccionados),
                PeliculaActorDTO = pelicula.Actores,
            };
        }


        [HttpGet("Filtrar")]
        public async Task<ActionResult<List<PeliculaDTO>>> Filtrar([FromQuery] PeliculasFiltrarDTO peliculasFiltrarDTO)
        {
            var peliculasQueryable = context.Pelicula.AsQueryable();

            if (!string.IsNullOrEmpty(peliculasFiltrarDTO.Titulo))
                peliculasQueryable = peliculasQueryable.Where(x => x.Titulo.Contains(peliculasFiltrarDTO.Titulo));
            if (peliculasFiltrarDTO.EnCines)
                peliculasQueryable = peliculasQueryable.Where(x => x.EnCines);
            if (peliculasFiltrarDTO.ProximosEstrenos)
            {

                peliculasQueryable = peliculasQueryable.Where(x => x.FechaLanzamiento > DateTime.Today);
            }

            if (peliculasFiltrarDTO.GeneroId > 0)
            {
                peliculasQueryable =
                peliculasQueryable.Where(x => x.PeliculasGeneros
                    .Select(y => y.GeneroId)
                    .Contains(peliculasFiltrarDTO.GeneroId));
            }
            await HttpContext.InsertParamsPaginationHeader(peliculasQueryable);
            var peliculas = await peliculasQueryable.Paginar(peliculasFiltrarDTO.PaginacionDTO).ToListAsync();
            return mapper.Map<List<PeliculaDTO>>(peliculas);
        }

        [HttpPut("{id:int}")]

        public async Task<ActionResult> Put(int id, [FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = await context.Pelicula
                .Include(x => x.PeliculasGeneros)
                .Include(x => x.PeliculasCines)
                .Include(x => x.PeliculasActores)
                .FirstOrDefaultAsync();

            if (pelicula is null) return NotFound();

            pelicula = mapper.Map(peliculaCreacionDTO, pelicula);

            if (peliculaCreacionDTO.Poster is not null)
            {
                pelicula.Poster = await storageFiles.EditFile(container, peliculaCreacionDTO.Poster, pelicula.Poster);
            }

            OrderActores(pelicula);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var pelicula = await context.Pelicula.FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula is null) return NotFound();

            context.Remove(pelicula);
            await context.SaveChangesAsync();

            if (pelicula.Poster is not null)
                await storageFiles.DeleteFile(pelicula.Poster, container);
            return NoContent();
        }

        private void OrderActores(Pelicula pelicula)
        {
            if (pelicula.PeliculasActores is not null)
            {
                for (int i = 0; i < pelicula.PeliculasActores.Count; i++)
                {
                    pelicula.PeliculasActores[i].Order = i;
                }
            }
        }
    }
}
