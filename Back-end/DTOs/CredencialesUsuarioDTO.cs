using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CredencialesUsuarioDTO
{
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
}
