import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUserDto } from 'src/modules/auth/dto/current-user.dto';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly userRoleService: UserRoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Get token from request
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validate the token's payload and attach the 'return value' to the request object
   * @param payload extracted from the JWT access token
   * @returns
   */
  async validate(payload: any): Promise<CurrentUserDto> {
    const user = await this.userService.getUserByUsername(payload.username);

    if (!user) throw new UnauthorizedException('User not found');

    const userRole = await this.userRoleService.getUserRole(user.id);

    if (!userRole) throw new UnauthorizedException('User role not found');

    return {
      userId: user.id,
      username: user.username,
      role: userRole.role.name,
    } as CurrentUserDto;
  }
}
