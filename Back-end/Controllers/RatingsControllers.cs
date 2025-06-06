using System.Security.Claims;
using Backend.DTOs;
using Backend.Entidades;
using Backend.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingsControllers : ControllerBase
    {
        private readonly ApplicationDbContext context;

        private readonly IServicioUsuarios servicioUsuarios;

        public RatingsControllers(
            ApplicationDbContext context,
            IServicioUsuarios servicioUsuarios,
            UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.servicioUsuarios = servicioUsuarios;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var usuarioId = await servicioUsuarios.GetUsuarioId();

            var ratingActual = await context.Ratings
            .FirstOrDefaultAsync(x => x.PeliculaId == ratingDTO.PeliculaId &&
            x.UsuarioId == usuarioId);

            if (ratingActual is null)
            {
                var rating = new Rating()
                {
                    PeliculaId = ratingDTO.PeliculaId,
                    Puntuacion = ratingDTO.Puntuacion,
                    UsuarioId = usuarioId,
                };
                context.Add(rating);
                await context.SaveChangesAsync();
            }
            else
            {
                ratingActual.Puntuacion = ratingDTO.Puntuacion;
            }
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
