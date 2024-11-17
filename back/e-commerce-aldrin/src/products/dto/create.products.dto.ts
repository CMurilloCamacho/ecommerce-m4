import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator"

export class CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string

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
  @IsString()
  imgUrl: string
  

}