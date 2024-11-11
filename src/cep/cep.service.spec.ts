import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CepService } from './cep.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('CepService', () => {
  let service: CepService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CepService>(CepService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('deve retornar dados do CEP', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        cep: '01001000',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Sé',
        street: 'Praça da Sé',
        service: 'open-cep',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(mockResponse));

    const result = await service.consultarCEP('01001000');
    expect(result.neighborhood).toBe('Sé');
    expect(result.city).toBe('São Paulo');
  });
});
