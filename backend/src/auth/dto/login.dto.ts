import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'VALIDATION.INVALID_EMAIL' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'VALIDATION.PASSWORD_MIN_LENGTH' })
  password: string;
}
