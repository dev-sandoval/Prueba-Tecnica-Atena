using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserManagement.API.Models;
using UserManagement.Application.Users.Commands.CreateUser;
using UserManagement.Application.Users.Queries.GetAll;

namespace UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetAll()
        {
            var result = await mediator.Send(new GetAllUsersQuery());

            if (!result.IsSuccess)
            {
                return BadRequest(ApiResponse<List<UserDto>>.Fail(result.Error));
            }

            return Ok(ApiResponse<List<UserDto>>.Ok(result.Value!, "Usuarios cargados correctamente"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Guid?>>> Create([FromBody] CreateUserCommand command)
        {
            var result = await mediator.Send(command);

            if (!result.IsSuccess)
            {
                return BadRequest(ApiResponse<Guid?>.Fail(result.Error));
            }

            return Ok(ApiResponse<Guid?>.Ok(result.Value, "Usuario creado exitosamente"));
        }
    }
}
