using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Backend.Servicios;

public class ServicioUsuarios : IServicioUsuarios
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly UserManager<IdentityUser> userManager;

    public ServicioUsuarios(IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> userManager)
    {
        this.httpContextAccessor = httpContextAccessor;
        this.userManager = userManager;
    }

    public async Task<string> GetUsuarioId()
    {
        var email = httpContextAccessor.HttpContext!.User.Claims.First(x => x.Type == ClaimTypes.Email)!.Value;
        var usuario = await userManager.FindByEmailAsync(email);
        return usuario!.Id;
    }
}
