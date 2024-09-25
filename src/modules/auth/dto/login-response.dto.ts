import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/user.schema';

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty({ type: User })
  user: User;
}
