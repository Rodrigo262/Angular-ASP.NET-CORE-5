using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Backend.DTOs;
using Backend.Utilidades;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [Route("api/cuentas")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;


        public CuentasController(
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            SignInManager<IdentityUser> signInManager,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("listadoUsuarios")]
        public async Task<ActionResult<List<UsuarioDTO>>> ListadoUsuarios([FromQuery] PaginacionDTO paginacionDTO)
        {
            var query = context.Users.AsQueryable();
            await HttpContext.InsertParamsPaginationHeader(query);
            var usuarios = await query.OrderBy(x => x.Email).Paginar(paginacionDTO).ToListAsync();

            return mapper.Map<List<UsuarioDTO>>(usuarios);

        }

        [HttpPost("hacerAdmin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "esadmin")]
        public async Task<ActionResult<RespuestaAutentificacion>> HacerAdmin(EditClaimDTO editClaimDTO)
        {
            var usuario = await userManager.FindByEmailAsync(editClaimDTO.Email);
            await userManager.AddClaimAsync(usuario, new Claim("role", "admin"));

            return NoContent();
        }

        [HttpPost("removerAdmin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "esadmin")]
        public async Task<ActionResult<RespuestaAutentificacion>> RemoverAdmin(EditClaimDTO editClaimDTO)
        {
            var usuario = await userManager.FindByEmailAsync(editClaimDTO.Email);
            await userManager.RemoveClaimAsync(usuario, new Claim("role", "admin"));

            return NoContent();
        }


        [HttpPost("crear")]
        public async Task<ActionResult<RespuestaAutentificacion>> Post([FromBody] CredencialesUsuarioDTO credencialesUsuario)
        {
            var usuario = new IdentityUser() { UserName = credencialesUsuario.Email, Email = credencialesUsuario.Email };
            var resultado = await userManager.CreateAsync(usuario, credencialesUsuario.Password);

            if (resultado.Succeeded)
            {
                return await CreateToken(credencialesUsuario);
            }

            return BadRequest(resultado.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutentificacion>> Login([FromBody] CredencialesUsuarioDTO credencialesUsuario)
        {
            var resultado = await signInManager.PasswordSignInAsync(
                credencialesUsuario.Email,
                credencialesUsuario.Password,
                isPersistent: false,
                lockoutOnFailure: false);

            if (resultado.Succeeded)
            {
                return await CreateToken(credencialesUsuario);
            }
            else
            {
                return BadRequest("Login Incorrecto");
            }
        }

        private async Task<RespuestaAutentificacion> CreateToken(CredencialesUsuarioDTO credencialesUsuario)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", credencialesUsuario.Email),
            };
            var usuario = await userManager.FindByEmailAsync(credencialesUsuario.Email);
            var claimsDB = await userManager.GetClaimsAsync(usuario);

            claims.AddRange(claimsDB);
            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);
            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new RespuestaAutentificacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiration,
            };
        }
    }
}
