import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'VALIDATION.USERNAME_MIN_LENGTH' })
  username: string;

  @IsEmail({}, { message: 'VALIDATION.INVALID_EMAIL' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'VALIDATION.PASSWORD_MIN_LENGTH' })
  password: string;
}
