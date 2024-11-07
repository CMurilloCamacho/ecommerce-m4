import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    console.log(`este es el método ${req.method} esta es la ruta ${req.url} estado ${res.statusCode}`);
    
    next();
  }
}
