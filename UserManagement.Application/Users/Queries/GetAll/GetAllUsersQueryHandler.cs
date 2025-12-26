using MediatR;
using Microsoft.EntityFrameworkCore;
using UserManagement.Application.Common;
using UserManagement.Application.Interfaces;

namespace UserManagement.Application.Users.Queries.GetAll;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, Result<List<UserDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllUsersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<UserDto>>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await _context.Users
            .AsNoTracking()
            .Select(u => new UserDto(
                u.Id,
                u.FirstName,
                u.LastName,
                u.Email,
                u.Phone,
                u.CreatedAt))
            .ToListAsync(cancellationToken);

        return Result<List<UserDto>>.Success(users);
    }
}