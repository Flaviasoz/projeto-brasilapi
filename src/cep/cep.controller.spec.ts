import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { Response } from 'express';
import { ConsultarCEPRes } from 'src/utils/interface';

describe('CepController', () => {
  let controller: CepController;
  let cepService: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [
        {
          provide: CepService,
          useValue: {
            consultarCEP: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CepController>(CepController);
    cepService = module.get<CepService>(CepService);
  });

  it('deve retornar dados do CEP', async () => {
    const mockResponse: ConsultarCEPRes = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      service: 'open-cep',
    };
    jest.spyOn(cepService, 'consultarCEP').mockResolvedValueOnce(mockResponse);

    const mockRes = {
      json: jest.fn().mockImplementation((result) => result),
    } as unknown as Response;

    await controller.consultarCep('01001000', mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });
});
