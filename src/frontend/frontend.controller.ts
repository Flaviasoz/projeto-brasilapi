import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get()
  getHome(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'src/public/index.html'));
  }
}
