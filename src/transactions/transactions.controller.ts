import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { Customer } from '@prisma/client';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('transfer')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: Customer,
  ) {
    return this.transactionsService.transfer(createTransactionDto, user);
  }

  @Post('withdraw')
  @UseGuards(JwtAuthGuard)
  createWithdraw(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: Customer,
  ) {
    return this.transactionsService.withdraw(createTransactionDto, user);
  }

  @Post('deposit')
  @UseGuards(JwtAuthGuard)
  createDeposit(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: Customer,
  ) {
    return this.transactionsService.deposit(createTransactionDto, user);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('account/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: Customer) {
    return this.transactionsService.findManyByCustomer(+id, user);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
}
