using System;
using Backend.DTOs;

namespace Backend.Utilidades;

public static class IQueryableExtensions
{
    public static IQueryable<T> Paginar<T>(this IQueryable<T> queryable, PaginacionDTO paginacionDTO)
    {
        return queryable
        .Skip((paginacionDTO.Page - 1) * paginacionDTO.PageSize)
        .Take(paginacionDTO.PageSize);
    }
}
