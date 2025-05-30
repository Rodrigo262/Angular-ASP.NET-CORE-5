namespace Backend.DTOs;

public class ActorCreacionDTO
{
    public string? Nombre { get; set; }
    public string? Biografia { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public IFormFile? Foto { get; set; }
}
