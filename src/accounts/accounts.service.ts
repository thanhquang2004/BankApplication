import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAccountDto: CreateAccountDto, customerId: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const existAccountNumber = await this.prismaService.account.findUnique({
      where: { accountNumber: createAccountDto.accountNumber },
    });

    if (existAccountNumber) {
      throw new UnprocessableEntityException('Account number already exists');
    }

    const balance = 0;
    return await this.prismaService.account.create({
      data: {
        accountNumber: createAccountDto.accountNumber,
        customerId,
        balance,
      },
    });
  }

  async generateAccountNumber() {
    const generatedAccountNumber = await Math.floor(
      10000000 + Math.random() * 9000000,
    ).toString();

    const existAccountNumber = await this.prismaService.account.findUnique({
      where: { accountNumber: generatedAccountNumber },
    });

    if (existAccountNumber) {
      return this.generateAccountNumber();
    }

    return { generatedAccountNumber };
  }

  async findAll(customerId: number) {
    return await this.prismaService.account.findMany({
      where: {
        customerId,
      },
    });
  }

  async findOne(id: number, customerId: number) {
    return await this.prismaService.account.findUnique({
      where: {
        id,
        customerId,
      },
    });
  }

  async findOneByAccountNumber(accountNumber: any) {
    return await this.prismaService.account.findUnique({
      where: {
        accountNumber: accountNumber.accountNumber,
      },
    });
  }

  async remove(id: number, customerId: number) {
    return await this.prismaService.account.delete({
      where: {
        id,
        customerId,
      },
    });
  }
}
