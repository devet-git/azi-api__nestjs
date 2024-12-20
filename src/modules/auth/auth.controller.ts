import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() account: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(account);
  }

  @Post('register')
  register(@Body() account: RegisterDto) {
    return this.authService.register(account);
  }
}
