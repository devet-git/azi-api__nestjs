import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/user.schema';

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty({ type: UserDto })
  user: UserDto;
}
