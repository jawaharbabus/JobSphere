import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Unified Seeker Login
  @Post('login')
  async loginSeeker(@Body() loginDto: { email: string; password: string }) {
    // Validate JobSeeker first
    const seeker = await this.authService.validateJobSeeker(
      loginDto.email,
      loginDto.password,
    );
    if (seeker) {
      return this.authService.loginJobSeeker(seeker);
    }

    // If not a JobSeeker, validate as TalentSeeker
    const talent = await this.authService.validateTalentSeeker(
      loginDto.email,
      loginDto.password,
    );
    if (talent) {
      return this.authService.loginTalentSeeker(talent);
    }

    // If neither, throw UnauthorizedException
    throw new UnauthorizedException('Invalid credentials');
  }
}
