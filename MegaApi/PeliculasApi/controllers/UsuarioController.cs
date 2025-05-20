using Microsoft.AspNetCore.Mvc;
using UsuarioAPI.Models;
using ContenidoAPI.Data;  

namespace UsuarioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly HubContext _context;

        public UsuarioController(HubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> GetUsuario()
        {
            return Ok(_context.Usuarios.ToList());
        }

        [HttpGet("{usuarioId}")]
        public ActionResult<Usuario> GetUsuario(int usuarioId)
        {
            var usuario = _context.Usuarios.FirstOrDefault(x => x.Id == usuarioId);
            if (usuario == null)
                return NotFound("El Usuario no existe");

            return Ok(usuario);
        }

        public class LoginRequest
        {
            public string Correo { get; set; } = string.Empty;
            public string Contra { get; set; } = string.Empty;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Correo == request.Correo && u.Contra == request.Contra);

            if (usuario == null)
            {
                return Unauthorized("Credenciales incorrectas");
            }

            return Ok(usuario); // o Ok(true), según lo que necesites
        }
    }
}
