import {   IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";




export class CreateUserDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
name:string;

@IsNotEmpty()
  @IsString()
email:string;

@IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
password:string;

@IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
address:string;

@IsNotEmpty()
  @IsNumber()
  @MinLength(3)
  @MaxLength(80)
phone:string;

@IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
conutry:string 

@IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
city:string 
}

export class LoginUserdto {
  @IsNotEmpty()
  @IsString()
email:string;

@IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
password:string;
}
