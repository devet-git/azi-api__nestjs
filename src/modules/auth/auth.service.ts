import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(account: RegisterDto) {
    if (account.confirmPassword === account.password) {
      const userDto = new CreateUserDto();
      userDto.password = await this.hashPassword(account.password);
      userDto.username = account.username;

      return this.userService.addUser(userDto);
    }
  }
  async login(account: LoginDto): Promise<LoginResponseDto> {
    const existUser = await this.userService.getUserByUsername(account.username);
    if (existUser && (await this.comparehashedPassword(account.password, existUser.password))) {
      return {
        accessToken: this.jwtService.sign({ username: account.username }),
        user: plainToClass(UserDto, existUser, {
          excludeExtraneousValues: true,
        }),
      } as LoginResponseDto;
    }

    throw new UnauthorizedException();
  }

  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  private async comparehashedPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
