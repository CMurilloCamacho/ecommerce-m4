import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  email?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
    name? : string

 

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Toda contraseña debe tener al menos una letra minuscula, una letra mayuscula, un numero  y una letra especial !@#$%^&*',
  })
  password? : string

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string

  @IsNotEmpty()
  @IsNumber()
  phone?: number

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?:string

}