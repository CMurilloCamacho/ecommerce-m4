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
  signup(@Body() user:any){
    const{confirmPassword, ...whitoutPassword} = user
    return this.authService.signUp(whitoutPassword)
  }

  @Post('/signin')
  signin(@Body() user:LoginUserdto){
    const {email, password} = user
    return this.authService.signIn(email, password)
  }
}
