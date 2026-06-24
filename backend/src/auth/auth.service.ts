import { Injectable, BadRequestException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // 1. Check if email or username already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new BadRequestException('This email address is already in use.');
      }
      if (existingUser.username === data.username) {
        throw new BadRequestException('This username is already taken.');
      }
    }

    // 2. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // 3. Generate verification token
    const verificationToken = randomBytes(32).toString('hex');

    // 4. Save to DB
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        verificationToken,
        isVerified: true, // TODO: Revert to false when Resend API is active
      },
    });

    // 5. Send verification email
    const confirmLink = `https://ultnexus.com/verify?token=${verificationToken}`;
    await this.mailService.sendVerificationEmail({ email: newUser.email, confirmLink });

    return {
      success: true,
      message: 'Registration successful! You can now log in.',
    };
  }

  async login(data: LoginDto) {
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('AUTH.INVALID_CREDENTIALS');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('AUTH.INVALID_CREDENTIALS');
    }

    // 3. (Optional) Check if email is verified
    // TODO: Uncomment when Resend API is active
    // if (!user.isVerified) {
    //   throw new BadRequestException('AUTH.EMAIL_NOT_VERIFIED');
    // }

    // 4. Generate JWT payload
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    // 5. Return success with token and user info (excluding password)
    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
