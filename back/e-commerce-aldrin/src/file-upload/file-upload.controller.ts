import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {
  }

    @Post('uploadImage/:id')
  @UseGuards(AuthGuard)

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