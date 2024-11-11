import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CepService } from './cep.service';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  async consultarCep(@Param('cep') cep: string, @Res() res: Response) {
    try {
      const resultado = await this.cepService.consultarCEP(cep);
      return res.json(resultado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao consultar o CEP', error });
    }
  }
}
