import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"

export class CreateProductDto {
  

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string

  @IsString()
  description: string
  @IsNumber()
  price: number
  @IsNumber()
  stock: number
  @IsOptional()
  @IsString()
  imgUrl?: string
  

}