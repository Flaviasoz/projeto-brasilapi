import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConsultarCEPRes } from 'src/utils/interface';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  async consultarCEP(cep: string): Promise<ConsultarCEPRes> {
    const url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    try {
      const response: AxiosResponse = await this.httpService
        .get(url)
        .toPromise();
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao consultar CEP: ${error.message}`);
    }
  }
}
