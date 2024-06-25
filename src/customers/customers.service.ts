import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.customer.findMany();
  }

  async getMe(id: number) {
    return await this.prismaService.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.customer.findUnique({
      where: {
        id,
      },
      include: {
        Accounts: true,
      },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.prismaService.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.customer.delete({
      where: {
        id,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.customer.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    const { hashedPassword, ...result } = user;
    hashedPassword;

    return result;
  }
}
