import { User } from '../models/user';
import { CreateUserDto } from '../models/create-user-dto';

export class UserMapper {
  /**
   * Mapea un objeto User a CreateUserDto
   */
  static toDomainDTO(user: User): CreateUserDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
  }

  /**
   * Mapea un CreateUserDto a User
   */
  static toPersistence(createUserDto: CreateUserDto, id: string): User {
    return {
      id,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      phone: createUserDto.phone,
      createdAt: new Date(),
    };
  }
}
