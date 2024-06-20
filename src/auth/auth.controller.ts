import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async egister(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refresh(@Request() req: any) {
    return this.authService.refresh(req.user);
  }
}
