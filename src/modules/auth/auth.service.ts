import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
    const existedUser = await this.userService.getUserByUsername(account.username);

    if (existedUser) throw new BadRequestException('Account already exist');

    if (account.confirmPassword != account.password) throw new BadRequestException('Password not match');

    const userDto = new CreateUserDto();
    userDto.password = await this.hashPassword(account.password);
    userDto.username = account.username;

    return this.userService.addUser(userDto);
  }

  async login(account: LoginDto): Promise<LoginResponseDto> {
    const existedUser = await this.userService.getUserByUsername(account.username);
    const isPwMatch = await this.compareHashedPassword(account.password, existedUser.password);

    if (existedUser && isPwMatch) {
      return {
        accessToken: this.jwtService.sign({ username: account.username, id: existedUser.id }),
        user: plainToClass(UserDto, existedUser, {
          excludeExtraneousValues: true,
        }),
      } as LoginResponseDto;
    }

    throw new BadRequestException('Account does not exist');
  }

  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  private async compareHashedPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
