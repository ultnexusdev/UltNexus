import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetUsernameDto } from './dto/set-username.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    login(body: LoginDto): Promise<{
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
    forgotPassword(body: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resendVerification(body: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    setUsername(body: SetUsernameDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
