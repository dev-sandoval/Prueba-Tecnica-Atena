using MediatR;
using UserManagement.Application.Common;

namespace UserManagement.Application.Users.Commands.CreateUser
{
    public record CreateUserCommand(string FirstName, string LastName, string Email, string Phone)
        : IRequest<Result<Guid>>;
}
