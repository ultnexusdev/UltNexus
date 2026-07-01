import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly mailService;
    private readonly jwtService;
    constructor(prisma: PrismaService, mailService: MailService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    login(data: LoginDto): Promise<{
        success: boolean;
        token: string;
        user: {
            id: any;
            username: any;
            email: any;
            role: any;
            isVerified: any;
            isProfileCompleted: any;
        };
    }>;
    verifyEmail(token: string): Promise<{
        success: boolean;
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    setUsername(userId: string, username: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
