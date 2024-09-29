import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Using this guard will execute JwtStrategy located in src\core\jwt.strategy.ts.
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
