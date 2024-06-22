import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async transfer(createTransactionDto: CreateTransactionDto, user: Customer) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: +createTransactionDto.accountId,
      },
    });

    if (!account) {
      throw new ForbiddenException('Account not found');
    }

    if (account.customerId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (account.balance < createTransactionDto.amount) {
      throw new ForbiddenException('Insufficient funds');
    }

    const accountFrom = await this.prismaService.account.update({
      where: {
        id: +createTransactionDto.accountId,
      },
      data: {
        balance: {
          decrement: +createTransactionDto.amount,
        },
      },
    });

    const accountTo = await this.prismaService.account.update({
      where: {
        accountNumber: createTransactionDto.toAccountNumber,
      },
      data: {
        balance: {
          increment: +createTransactionDto.amount,
        },
      },
    });

    return await this.prismaService.transaction.create({
      data: {
        amount: +createTransactionDto.amount,
        transactionType: 'TRANSFER',
        accountId: +accountFrom.id,
        toAccountNumber: accountTo.accountNumber,
        description: createTransactionDto.description,
      },
    });
  }

  async withdraw(createTransactionDto: CreateTransactionDto, user: Customer) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: +createTransactionDto.accountId,
      },
    });

    if (!account) {
      throw new ForbiddenException('Account not found');
    }

    if (account.customerId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (account.balance < createTransactionDto.amount) {
      throw new ForbiddenException('Insufficient funds');
    }

    await this.prismaService.account.update({
      where: {
        id: +createTransactionDto.accountId,
      },
      data: {
        balance: {
          decrement: +createTransactionDto.amount,
        },
      },
    });

    return await this.prismaService.transaction.create({
      data: {
        amount: +createTransactionDto.amount,
        transactionType: 'WITHDRAW',
        accountId: +account.id,
      },
    });
  }

  async deposit(createTransactionDto: CreateTransactionDto, user: Customer) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: +createTransactionDto.accountId,
      },
    });

    if (!account) {
      throw new ForbiddenException('Account not found');
    }

    if (account.customerId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (account.balance < createTransactionDto.amount) {
      throw new ForbiddenException('Insufficient funds');
    }

    await this.prismaService.account.update({
      where: {
        id: +createTransactionDto.accountId,
      },
      data: {
        balance: {
          increment: +createTransactionDto.amount,
        },
      },
    });

    return await this.prismaService.transaction.create({
      data: {
        amount: +createTransactionDto.amount,
        transactionType: 'WITHDRAW',
        accountId: +account.id,
      },
    });
  }

  async findAll() {
    return this.prismaService.transaction.findMany();
  }

  async findManyByCustomer(id: number, user: Customer) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id,
      },
    });

    if (!account) {
      throw new ForbiddenException('Account not found');
    }

    if (account.customerId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prismaService.transaction.findMany({
      where: {
        accountId: id,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });
  }
}
