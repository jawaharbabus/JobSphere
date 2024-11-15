import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // JobSeeker Login
  @Post('jobseeker/login')
  async loginJobSeeker(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateJobSeeker(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.loginJobSeeker(user);
  }

  // TalentSeeker Login
  @Post('talentseeker/login')
  async loginTalentSeeker(
    @Body() loginDto: { email: string; password: string },
  ) {
    const user = await this.authService.validateTalentSeeker(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.loginTalentSeeker(user);
  }
}
