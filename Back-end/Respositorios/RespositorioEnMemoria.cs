using Backend.Entidades;

namespace Backend.Respositorios;

public class RespositorioEnMemoria : IRepositorio
{
    private List<Genero> _generos;
    public RespositorioEnMemoria(ILogger<RespositorioEnMemoria> logger)
    {
        _generos = new List<Genero>()
        {
            new Genero(){Id=1, Nombre="Comedia"},
            new Genero(){Id=2, Nombre="Acción"},
        };
        _guid = Guid.NewGuid();
    }

    public Guid _guid;

    public List<Genero> GetAllGeneros()
    {
        return _generos;
    }

    public async Task<Genero> GetById(int id)
    {
        await Task.Delay(1);
        return _generos.FirstOrDefault(w => w.Id == id);
    }

    public Guid GetGuid()
    {
        return _guid;
    }

    public void CrearGenero(Genero genero)
    {
        genero.Id = _generos.Count + 1;
        _generos.Add(genero);
    }
}
