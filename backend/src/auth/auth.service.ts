import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
    // 1. Check if email or username already exists using raw SQL for case insensitivity
    const existingUsers = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM "User" 
      WHERE LOWER(email) = LOWER(${data.email}) 
         OR (username IS NOT NULL AND LOWER(username) = LOWER(${data.username}))
    `;

    if (existingUsers && existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.email.toLowerCase() === data.email.toLowerCase()) {
        throw new BadRequestException('This email address is already in use.');
      }
      if (existingUser.username && data.username && existingUser.username.toLowerCase() === data.username.toLowerCase()) {
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
        isVerified: false,
        isProfileCompleted: true,
      },
    });

    // 5. Send verification email
    const confirmLink = `http://localhost:3000/verify?token=${verificationToken}`;
    await this.mailService.sendVerificationEmail({ email: newUser.email, confirmLink });

    return {
      success: true,
      message: 'Registration successful! You can now log in.',
    };
  }

  async login(data: LoginDto) {
    // 1. Find user by email or username using raw SQL for case insensitivity
    const users = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM "User" 
      WHERE LOWER(email) = LOWER(${data.email}) 
         OR (username IS NOT NULL AND LOWER(username) = LOWER(${data.email}))
    `;

    if (!users || users.length === 0) {
      throw new BadRequestException('AUTH.INVALID_CREDENTIALS');
    }

    const user = users[0];

    // 2. Check if password exists (OAuth users might not have a password)
    if (!user.password) {
      throw new BadRequestException('Please login using your social media account.');
    }

    // 3. Compare password
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
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role,
      isVerified: user.isVerified
    };
    const token = this.jwtService.sign(payload);

    // 5. Return success with token and user info (excluding password)
    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isProfileCompleted: user.isProfileCompleted
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token.');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    return {
      success: true,
      message: 'Email successfully verified. You can now use all features.',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // For security, don't reveal if user exists, just return success message
      return { success: true, message: 'If an account with that email exists, we sent a password reset link.' };
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `https://ultnexus.com/reset-password?token=${resetToken}`;
    await this.mailService.sendPasswordResetEmail({ email: user.email, resetLink });

    return { success: true, message: 'If an account with that email exists, we sent a password reset link.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }, // Token must not be expired
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired password reset token.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true, message: 'Password has been reset successfully. You can now log in.' };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    
    if (user.isVerified) {
      throw new BadRequestException('Email is already verified.');
    }

    const verificationToken = randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });

    const confirmLink = `http://localhost:3000/verify?token=${verificationToken}`;
    await this.mailService.sendVerificationEmail({ email: user.email, confirmLink });

    return { success: true, message: 'Verification email has been resent.' };
  }

  async setUsername(userId: string, username: string) {
    // 1. Check if username is already taken (case-insensitive)
    const existingUsers = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM "User" 
      WHERE username IS NOT NULL AND LOWER(username) = LOWER(${username})
    `;

    if (existingUsers && existingUsers.length > 0) {
      throw new BadRequestException('This username is already taken.');
    }

    // 2. Update the user (Constraint check handles forbidden names and regex)
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          username: username,
          isProfileCompleted: true
        }
      });
    } catch (e: any) {
      if (e.message && e.message.includes('check_username_format')) {
        throw new BadRequestException('Invalid or forbidden username.');
      }
      throw e;
    }

    return { success: true, message: 'Username successfully set.' };
  }
}
