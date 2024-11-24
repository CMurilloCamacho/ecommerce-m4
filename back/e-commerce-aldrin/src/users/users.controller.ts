import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decoradors/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.usersService.findAll(parseInt(page), parseInt(limit));
    return this.usersService.findAll(1, 5);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({status:200, description: 'Usuario encontrado'})
  @ApiResponse({status:400, description: 'Formato ID no valido'})
  @ApiResponse({status:404, description: 'No se encontró al usuario'})
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    let userFound = await this.usersService.findOne(id);
    return userFound;
  }

  @Post()
  @ApiResponse({status:409, description: 'El correo ya existe'})
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  @ApiBearerAuth()
  @Put(':id')
  @ApiResponse({status: 404, description: 'No existe el id del usuario'})
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserDto: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, createUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({status: 404, description: 'No existe el id del usuario'})
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
