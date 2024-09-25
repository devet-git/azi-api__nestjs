import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/modules/user/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/modules/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abcutyyxx__sass123adf',
    });
  }

  async validate(payload: any): Promise<User> {
    return await this.userService.getUserByUsername(payload.username);
  }
}
