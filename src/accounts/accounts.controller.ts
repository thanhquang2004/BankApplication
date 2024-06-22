import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { Customer } from '@prisma/client';

@Controller('customers/:customerId/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    // @Param('customerId') customerId: number,
    @CurrentUser() user: Customer,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    console.log(user);
    return await this.accountsService.create(createAccountDto, user.id);
  }

  @Get('generate-account-number')
  @UseGuards(JwtAuthGuard)
  async generateAccountNumber() {
    return await this.accountsService.generateAccountNumber();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: Customer) {
    return await this.accountsService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: Customer) {
    return await this.accountsService.findOne(+id, user.id);
  }

  @Get('account-number/id')
  @UseGuards(JwtAuthGuard)
  async findOneByAccountNumber(@Body() accountNumber: any) {
    return await this.accountsService.findOneByAccountNumber(accountNumber);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: Customer) {
    return await this.accountsService.remove(+id, user.id);
  }
}
