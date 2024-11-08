import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.respository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository ) {}
  create(createUserDto: any) {
    return this.usersRepository.createUser(createUserDto)
  }

  findAll(page, limit) {
    return this.usersRepository.getUsers(page, limit);
  }

  findOne(id: number) {
    return this.usersRepository.getUserById(id)

  }

  update(id: number, updateUserDto: any) {
    return this.usersRepository.updateUser(id, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.deleteUser(id)
  }
}
