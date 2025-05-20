using Microsoft.EntityFrameworkCore;
using ContenidoAPI.Models;
using UsuarioAPI.Models;

namespace ContenidoAPI.Data
{
    public class HubContext : DbContext
    {
        public HubContext(DbContextOptions<HubContext> options) : base(options) {}

        public DbSet<Contenido> Contenidos { get; set; }

        public DbSet<Usuario> Usuarios {get; set;}

    }
}
