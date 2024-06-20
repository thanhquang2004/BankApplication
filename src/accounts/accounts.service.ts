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

  findAll(customerId: number) {
    return this.prismaService.account.findMany({
      where: {
        customerId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
