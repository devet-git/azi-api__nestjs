import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  avatar_url: string;

  @Expose()
  location: string;

  @Expose()
  role: string;
}
