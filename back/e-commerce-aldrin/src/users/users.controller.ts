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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.usersService.findAll(parseInt(page), parseInt(limit));
    return this.usersService.findAll(1, 5);
  }



  @Get(':id')
  @UseGuards(AuthGuard)

  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  } 

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {  
    return  await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)

  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: number, @Body() createUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(+id, createUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)

  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
