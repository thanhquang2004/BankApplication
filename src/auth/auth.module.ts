import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.stratrgy';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    LocalStrategy,
    CustomersService,
    RefreshJwtStrategy,
  ],
  imports: [
    CustomersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: `${configService.get('JWT_SECRET')}`,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
