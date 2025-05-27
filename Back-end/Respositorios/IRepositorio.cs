using Backend.Entidades;

namespace Backend.Respositorios;

public interface IRepositorio
{
    Guid GetGuid();
    void CrearGenero(Genero genero);
    List<Genero> GetAllGeneros();
    Task<Genero> GetById(int id);
}
