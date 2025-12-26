using System.Text.RegularExpressions;

namespace UserManagement.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string FirstName { get; private set; } = string.Empty;
        public string LastName { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }

        private User() { }

        public static User Create(string firstName, string lastName, string email, string phone)
        {
            if (string.IsNullOrWhiteSpace(firstName) || firstName.Length < 3)
                throw new ArgumentException("El nombre debe tener al menos 3 caracteres.");

            if (string.IsNullOrWhiteSpace(email) || !Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new ArgumentException("El formato del email no es válido.");

            if (string.IsNullOrWhiteSpace(phone) || phone.Length < 9 || !phone.All(char.IsDigit))
                throw new ArgumentException("El teléfono debe tener al menos 9 dígitos numéricos.");

            return new User
            {
                Id = Guid.NewGuid(),
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Phone = phone,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
