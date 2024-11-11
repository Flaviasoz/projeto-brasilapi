import { Module } from '@nestjs/common';
import { CepModule } from './cep/cep.module';
import { FrontendController } from './frontend/frontend.controller';

@Module({
  imports: [CepModule],
  controllers: [FrontendController],
})
export class AppModule {}
