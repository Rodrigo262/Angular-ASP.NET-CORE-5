using AutoMapper;
using Backend.DTOs;
using Backend.Entidades;
using Backend.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/cines")]
    [ApiController]
    public class CinesController : ControllerBase
    {
        private readonly ILogger<CinesController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CinesController(
            ILogger<CinesController> logger,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<CineDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Cines.AsQueryable();
            await HttpContext.InsertParamsPaginationHeader(queryable);
            var cines = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<CineDTO>>(cines);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CineDTO>> Get(int id)
        {
            var cine = await context.Cines.FirstOrDefaultAsync(x => x.Id == id);

            if (cine == null) return NotFound();

            return mapper.Map<CineDTO>(cine);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = mapper.Map<Cine>(cineCreacionDTO);
            context.Add(cine);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = await context.Cines.FirstOrDefaultAsync(x => x.Id == id);

            if (cine == null) return NotFound();

            cine = mapper.Map(cineCreacionDTO, cine);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Cines.AnyAsync(x => x.Id == id);

            if (!exist) return NotFound();

            //context.Remove(new Cine { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
