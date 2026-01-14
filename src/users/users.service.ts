import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {

    const newUser: User = {
      id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,

      isActive: createUserDto.isActive ?? true,
      role: createUserDto.role ?? 'USER',

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }



  findByEmail(email: string): User | undefined {

    return this.users.find(
      user => user.email === email
    );
  }

  findById(id: string): User | undefined {

    return this.users.find(
      user => user.id === id
    );
  }

  findAll(): Omit<User, 'password'>[] {

    return this.users.map(({ password, ...rest }) => rest);
  }

  delete(id: string): void {

    this.users = this.users.filter(
      user => user.id !== id
    );
  }
}
