import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, ConfigService],
})
export class CustomersModule {}
