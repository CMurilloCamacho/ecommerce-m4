import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateCollectionOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  create(createUserDto: Users) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(page: number, limit: number): Promise<Users[]> {
    const [users] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const updUsers = users.map(({ isAdmin, ...extractUsers }) => extractUsers);
    return updUsers;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new Error(`No se encontró un usuario con el ID: ${id}`);
    }

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      address: user.address,
      city: user.city,

      orders: user.orders.map((order) => ({
        id: order.id,
        date: order.date,
      })),
    };
    return response
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    // Object.assign(newUser, createUserDto)
    let newUser = new Users();
    newUser = this.usersRepository.create(createUserDto);

    console.log('este es nuevo usuario', newUser);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
