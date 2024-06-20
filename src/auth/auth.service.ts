import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Customer } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const existingUser = this.prismaService.customer.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (!existingUser) {
      throw new UnprocessableEntityException('User already exists');
    }

    return this.prismaService.customer.create({
      data: {
        fullName: createAuthDto.fullName,
        email: createAuthDto.email,
        hashedPassword: await this.hashPassword(createAuthDto.password),
      },
    });
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findOne(id: number) {
    return this.prismaService.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async login(user: Customer) {
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    const accessToken = this.jwtService.sign(payload);

    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async convertToJwtToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
