using System;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Filtros;

public class MiFiltroDeAccion : IActionFilter
{
    private ILogger logger;

    public MiFiltroDeAccion(ILogger logger)
    {
        this.logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        logger.LogInformation("Antes de ejecutar la acción");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        logger.LogInformation("Después de ejecutar la acción");
    }

}
