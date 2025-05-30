using System;
using Microsoft.EntityFrameworkCore;

namespace Backend.Utilidades;

public static class HttpContextExtensions
{
    public async static Task InsertParamsPaginationHeader<T>(
        this HttpContext httpContext, IQueryable<T> queryable)
    {
        if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

        double cantidad = await queryable.CountAsync();
        httpContext.Response.Headers.Append("TotalItems", cantidad.ToString());
    }
}
