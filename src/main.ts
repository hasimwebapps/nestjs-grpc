import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
async function bootstrapGRPC() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'awb',
        protoPath: join(__dirname, './hero/awb.proto'),
        url: '0.0.0.0:50052',
      },
    },
  );
  await app.listen();
}
bootstrapGRPC();
