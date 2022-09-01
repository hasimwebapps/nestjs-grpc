import { Module } from '@nestjs/common';
import { AwbController } from './awb.controller';

@Module({
  imports: [
    // this is for client
  ],
  controllers: [AwbController],
})
export class AwbModule { }
