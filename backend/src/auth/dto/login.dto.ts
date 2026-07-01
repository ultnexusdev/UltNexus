import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'VALIDATION.INVALID_CREDENTIALS' })
  email: string; // Still named email in DTO for compatibility, but holds email or username

  @IsString()
  @MinLength(6, { message: 'VALIDATION.PASSWORD_MIN_LENGTH' })
  password: string;
}
