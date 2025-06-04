using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SploshApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        // Función para hashear contraseña con SHA256
        private byte[] HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                return sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] dynamic user)
        {
            string correo = user.GetProperty("email").GetString();
            string contrasena = user.GetProperty("password").GetString();


            byte[] hashedPassword = HashPassword(contrasena);

            using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                string query = "INSERT INTO Users (Email, PasswordHash) VALUES (@Email, @PasswordHash)";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", correo);
                command.Parameters.AddWithValue("@PasswordHash", hashedPassword);

                connection.Open();
                int result = command.ExecuteNonQuery();
                connection.Close();

                if (result > 0)
                    return Ok(new { status = "success", message = "Usuario registrado correctamente" });
                else
                    return BadRequest(new { status = "error", message = "Error al registrar usuario" });
            }
        }

[HttpPost("login")]
public IActionResult Login([FromBody] JsonElement user)
{
    string correo = user.GetProperty("email").GetString();
    string contrasena = user.GetProperty("password").GetString();

    byte[] hashedPassword = HashPassword(contrasena);

    using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
    {
        string query = "SELECT PasswordHash FROM Users WHERE Email = @Email";
        SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Email", correo);

        connection.Open();
        var dbPasswordHash = command.ExecuteScalar() as byte[];
        connection.Close();

        if (dbPasswordHash == null)
        {
            return Unauthorized(new { status = "error", message = "Credenciales inválidas" });
        }

        bool passwordMatches = dbPasswordHash.SequenceEqual(hashedPassword);

        if (passwordMatches)
        {
            return Ok(new { status = "success" });
        }
        else
        {
            return Unauthorized(new { status = "error", message = "Credenciales inválidas" });
        }
    }
}
}

    }

