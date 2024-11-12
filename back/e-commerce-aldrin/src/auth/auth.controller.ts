import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserdto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth():string {
  return this.authService.getAuth()
  }

  @Post('/signup')
  signup(@Body() createUserdto:CreateUserDto){
    return "info correcta"
  }

  @Post('/signin')
  signin(@Body() loginUserDto:LoginUserdto){
    return 'info correcta'
  }
}
