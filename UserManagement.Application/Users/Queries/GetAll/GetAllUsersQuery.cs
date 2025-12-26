using MediatR;
using UserManagement.Application.Common;

namespace UserManagement.Application.Users.Queries.GetAll
{
    public record UserDto(Guid Id, string FirstName, string LastName, string Email, string Phone, DateTime CreatedAt);

    public record GetAllUsersQuery : IRequest<Result<List<UserDto>>>;
}
