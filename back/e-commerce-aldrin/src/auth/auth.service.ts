import { BadRequestException,  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>, private jwtRepository:JwtService) {}
  
  getAuth() {
    return "Autenticado"
  }

  async signIn (email:string, password:string){
   
    const user = await this.userRepository.findOneBy({email})
    if(!user) {
      throw new BadRequestException(`No se encontró al usuario: ${user}`)
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
   if(!passwordMatch) throw new BadRequestException(`Credencial inválido`)
   
    const payload = {
      id : user.id,
      email: user.email,
      isAdmin: user.isAdmin
  }
    const token = this.jwtRepository.sign(payload)
    return {
      token, 
      message: `El usuario se ha logeado correctamente`
    }
  }





  async signUp(user: CreateUserDto){

    const foundUser = await this.userRepository.findOne({
      where: {email:user.email},
    relations: ['orders']
    },
      

    )
    if(foundUser) throw new BadRequestException(`El usuario ya esta registrado`)

      const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = {...user, password: hashedPassword}

    const saveUser = await this.userRepository.save(newUser)
    const{password,...userWithoutPassword} = saveUser
    return userWithoutPassword
  }
}
