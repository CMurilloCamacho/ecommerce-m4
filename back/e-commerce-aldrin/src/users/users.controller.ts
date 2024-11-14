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
import { Users } from 'src/entities/users.entity';
import { UpdateUserDto} from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.usersService.findAll(parseInt(page), parseInt(limit));
    return this.usersService.findAll(1, 5);
  }



  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  } 

  @Post()
  createUser(@Body() createUserDto: Users) {  
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: number, @Body() createUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(+id, createUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
