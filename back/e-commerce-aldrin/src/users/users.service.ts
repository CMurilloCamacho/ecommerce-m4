import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
  create(createUserDto:Users ) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(page:number, limit:number):Promise<Users[]> {
    
    const [users]= await this.usersRepository.findAndCount({skip: (page-1)*limit, take:limit})
    return users
    

  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: Users): Promise<Users>{
    // Object.assign(newUser, createUserDto)
    let newUser = new Users()
    newUser = this.usersRepository.create(createUserDto)
    
    console.log('este es nuevo usuario', newUser);
    return await this.usersRepository.save(newUser)


  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
