using MediatR;
using Microsoft.EntityFrameworkCore;
using UserManagement.Application.Common;
using UserManagement.Application.Interfaces;
using UserManagement.Domain.Entities;

namespace UserManagement.Application.Users.Commands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Result<Guid>>
    {
        private readonly IApplicationDbContext _context;

        public CreateUserCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Guid>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = User.Create(request.FirstName, request.LastName, request.Email, request.Phone);

                var existeEmail = await _context.Users.AnyAsync(u => u.Email == request.Email, cancellationToken);
                if (existeEmail)
                {
                    return Result<Guid>.Failure("El correo electrónico ya está registrado.");
                }

                _context.Users.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Guid>.Success(entity.Id);
            }
            catch (ArgumentException ex)
            {
                return Result<Guid>.Failure(ex.Message);
            }
        }
    }
}
