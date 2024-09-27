import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/modules/user/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User, UserDocument } from 'src/modules/user/user.schema';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abcutyyxx__sass123adf',
    });
  }

  async validate(payload: any): Promise<UserDocument> {
    const user = await this.userService.getUserByUsername(payload.username);
    return user;
  }
}
