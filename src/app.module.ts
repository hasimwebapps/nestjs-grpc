import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwbModule } from './awb/awb.module';

@Module({
  imports: [AwbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
