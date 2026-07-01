import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SetUsernameDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_.]+$/, {
    message: 'Username can only contain letters, numbers, underscores and dots',
  })
  username: string;
}
