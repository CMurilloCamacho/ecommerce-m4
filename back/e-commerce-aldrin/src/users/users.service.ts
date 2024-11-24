import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { validate as isUuid } from 'uuid';

type PublicUser = Omit<Users, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  create(createUserDto: Users) {
    return this.usersRepository.create(createUserDto);
  }
  async findAll(page: number, limit: number): Promise<PublicUser[]> {
    const [users] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['orders'],
    });

    const PublicUser = users.map(
      ({ isAdmin, password, ...extractUsers }) => extractUsers,
    );

    return PublicUser;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`No se encontró un usuario con el ID: ${id}`); //buscar errores  en nestJs
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
    return response;
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const checkEmail = await this.usersRepository.findOne({
      where: {email: createUserDto.email}
    })

    if(checkEmail) throw new ConflictException(`El email ${createUserDto.email} ya existe`)
    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUuid(id)) {
      throw new BadRequestException(`él usuario con ID: ${id} no existe`);
    }
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user)
      throw new NotFoundException(`No se encontró el usuario con Id: ${id}`);
    await this.usersRepository.update(id, updateUserDto);
    const updateUser = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    const { password, ...withoutPass } = updateUser;

    return withoutPass;
  }

  async remove(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException(`él usuario con ID: ${id} no existe`);
    }
    const user = this.usersRepository.findOne({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`No se encontró al usuario con id: ${id}`);
    await this.usersRepository.delete(id);
    return 'Usuario Eliminado';
  }
}
