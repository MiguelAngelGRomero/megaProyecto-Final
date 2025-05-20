using ContenidoAPI.Models;
using ContenidoAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ContenidoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContenidoController : ControllerBase
    {
        private readonly HubContext _context;

        public ContenidoController(HubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contenido>> GetContenidos()
        {
            return Ok(_context.Contenidos.ToList());
        }

        [HttpGet("{contenidoId}")]
        public ActionResult<Contenido> GetContenido(int contenidoId)
        {
            var contenido = _context.Contenidos.FirstOrDefault(x => x.Id == contenidoId);
            if (contenido == null)
                return NotFound("El contenido solicitado no existe");

            return Ok(contenido);
        }
    }
}
