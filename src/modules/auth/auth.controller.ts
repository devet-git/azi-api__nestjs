import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  login(): string[] {
    return ['3123213'];
  }
}
