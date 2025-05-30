using System;

namespace Backend.DTOs;

public class PaginacionDTO
{
    private readonly int maxItemsPerPage = 50;

    public int Page { get; set; }

    private int pageSize = 10;


    public int PageSize
    {
        get { return pageSize; }
        set { pageSize = value > maxItemsPerPage ? maxItemsPerPage : value; }
    }
}
