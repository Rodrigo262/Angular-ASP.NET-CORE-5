using Backend.Entidades;
using Backend.Filtros;
using Backend.Respositorios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Backend.Controllers
{
    [Route("api/generos")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GenerosController : ControllerBase
    {
        private readonly IRepositorio repositorio;
        private readonly ILogger<GenerosController> logger;

        public GenerosController(IRepositorio repositorio, ILogger<GenerosController> logger)
        {
            this.repositorio = repositorio;
            this.logger = logger;
        }

        [HttpGet("GetAll")]
        //[ResponseCache(Duration = 60)]
        [ServiceFilter(typeof(MiFiltroDeAccion))]
        public ActionResult<List<Genero>> Get()
        {
            logger.LogInformation("Vamos a mostrar los géneros");
            return repositorio.GetAllGeneros();
        }

        [HttpGet("guid")]
        public ActionResult<Guid> GetGuid()
        {
            return repositorio.GetGuid();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Genero>> Get(int id)
        {
            //if (!ModelState.IsValid) return BadRequest(ModelState);
            logger.LogDebug("Obteniendo un genero by id {0}", id);
            var result = await repositorio.GetById(id);

            if (result == null)
            {
                throw new Exception("El genero no fue encontrado");
                logger.LogWarning("No se encontró el género con el id{0}", id);
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genero genero)
        {
            repositorio.CrearGenero(genero);
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] string id)
        {
            return NoContent();
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] string id)
        {
            return NoContent();
        }
    }
}
