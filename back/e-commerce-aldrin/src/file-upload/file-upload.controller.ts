import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {
  }

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('productId') productId: string, @UploadedFile(

        new ParseFilePipe({
          validators:[
            new MaxFileSizeValidator({
              maxSize: 200000,
              message: 'Tamaño maximo es de 200 kb'
            }),
            new FileTypeValidator({
              fileType: /(jpg|jpeg|webp|png)$/
            })
          ]

        })

    ) file: Express.Multer.File){
      return this.fileUploadService.uploadProductImage(file, productId)
    }
}



//actualizar el producto