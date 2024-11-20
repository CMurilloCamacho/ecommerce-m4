import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateCollectionOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
  create(createUserDto:Users ) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(page:number, limit:number):Promise<Users[]> {
    
    const [users]= await this.usersRepository.findAndCount({skip: (page-1)*limit, take:limit})
    
     const usersList =users.map(({isAdmin, ...users})=>users)
    return usersList
    

  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users>{
    // Object.assign(newUser, createUserDto)
    let newUser = new Users()
    newUser = this.usersRepository.create(createUserDto)
    
    console.log('este es nuevo usuario', newUser);
    return await this.usersRepository.save(newUser)


  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
