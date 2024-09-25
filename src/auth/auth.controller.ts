import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  findAll(): string[] {
    return ['3123213'];
  }
}
