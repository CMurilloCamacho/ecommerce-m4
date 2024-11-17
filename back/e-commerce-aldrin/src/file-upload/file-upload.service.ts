import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Products } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(private fileUplodRepository: FileUploadRepository,
    @InjectRepository(Products) private productsRepository: Repository<Products>
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string){

    const product = await this.productsRepository.findOneBy({id: productId})

    if(!product) throw new NotFoundException ("No se encontró el producto")



    const uploadImage = await this.fileUplodRepository.uploadImage(file)   // --> sacar consoleLog es un objeto (uploadImage)

    await this.productsRepository.update(product.id, {imgUrl:uploadImage.secure_url})

    

    return product
  }
}
