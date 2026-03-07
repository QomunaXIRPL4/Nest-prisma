import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ===== LOGIN (ADMIN & PETUGAS) =====
  @Post('login')
  @ApiOperation({ summary: 'Login user dan menghasilkan JWT token' })
  login(@Body() dto: LoginDto) {
return this.authService.login(dto.username, dto.password);
}

  // ===== REGISTER ADMIN =====
  @Post('register-admin')
  registerAdmin(@Body() body: { username: string; password: string }) {
    return this.authService.registerAdmin(
      body.username,
      body.password,
    );
  }

  // ===== REGISTER PETUGAS =====
  @Post('register-petugas')
  registerPetugas(@Body() body: { username: string; password: string }) {
    return this.authService.registerPetugas(
      body.username,
      body.password,
    );
  }
}
