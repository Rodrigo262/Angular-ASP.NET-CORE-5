using AutoMapper;
using Backend.DTOs;
using Backend.DTOs.Peliculas;
using Backend.Entidades;
using Backend.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/actores")]
    [ApiController]
    public class ActoresController : ControllerBase
    {
        private readonly ILogger<ActoresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;

        private const string container = "actores";
        public ActoresController(
            ILogger<ActoresController> logger,
            ApplicationDbContext context,
            IMapper mapper,
            IStorageFiles storageFiles)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Actores.AsQueryable();
            await HttpContext.InsertParamsPaginationHeader(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actores);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) return NotFound();

            return mapper.Map<ActorDTO>(actor);
        }

        [HttpGet("{nombre}")]
        public async Task<ActionResult<List<PeliculaActorDTO>>> Get(string nombre)
        {
            if (string.IsNullOrEmpty(nombre)) return new List<PeliculaActorDTO>();

            var actores = await context.Actores
            .Where(x => !string.IsNullOrEmpty(x.Nombre) && x.Nombre.Contains(nombre))
            .Take(5)
            .ToListAsync();

            if (actores == null) return new List<PeliculaActorDTO>();

            return mapper.Map<List<PeliculaActorDTO>>(actores);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = mapper.Map<Actor>(actorCreacionDTO);

            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await storageFiles.SaveFile(container, actorCreacionDTO.Foto);
            }
            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) return NotFound();
            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await storageFiles.EditFile(container, actorCreacionDTO.Foto, actor.Foto);
            }

            actor = mapper.Map(actorCreacionDTO, actor);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Actores.AnyAsync(x => x.Id == id);

            if (!exist) return NotFound();

            //context.Remove(new Actor { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
