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
            id: string;
            username: string;
            email: string;
        };
    }>;
}
