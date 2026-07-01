import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'VALIDATION.USERNAME_MIN_LENGTH' })
  @Matches(/^[A-Za-z0-9_.]+$/, {
    message: 'Username can only contain letters, numbers, underscores and dots',
  })
  username: string;

  @IsEmail({}, { message: 'VALIDATION.INVALID_EMAIL' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'VALIDATION.PASSWORD_MIN_LENGTH' })
  password: string;
}
