import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('customers')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':customerId/accounts')
  async create(
    @Param('customerId') customerId: number,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return await this.accountsService.create(createAccountDto, +customerId);
  }

  @Get()
  findAll(@Param('customerId') customerId: number) {
    return this.accountsService.findAll(+customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
