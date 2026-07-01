"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    mailService;
    jwtService;
    constructor(prisma, mailService, jwtService) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async register(data) {
        const existingUsers = await this.prisma.$queryRaw `
      SELECT * FROM "User" 
      WHERE LOWER(email) = LOWER(${data.email}) 
         OR (username IS NOT NULL AND LOWER(username) = LOWER(${data.username}))
    `;
        if (existingUsers && existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.email.toLowerCase() === data.email.toLowerCase()) {
                throw new common_1.BadRequestException('This email address is already in use.');
            }
            if (existingUser.username && data.username && existingUser.username.toLowerCase() === data.username.toLowerCase()) {
                throw new common_1.BadRequestException('This username is already taken.');
            }
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
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
        const confirmLink = `http://localhost:3000/verify?token=${verificationToken}`;
        await this.mailService.sendVerificationEmail({ email: newUser.email, confirmLink });
        return {
            success: true,
            message: 'Registration successful! You can now log in.',
        };
    }
    async login(data) {
        const users = await this.prisma.$queryRaw `
      SELECT * FROM "User" 
      WHERE LOWER(email) = LOWER(${data.email}) 
         OR (username IS NOT NULL AND LOWER(username) = LOWER(${data.email}))
    `;
        if (!users || users.length === 0) {
            throw new common_1.BadRequestException('AUTH.INVALID_CREDENTIALS');
        }
        const user = users[0];
        if (!user.password) {
            throw new common_1.BadRequestException('Please login using your social media account.');
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('AUTH.INVALID_CREDENTIALS');
        }
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            isVerified: user.isVerified
        };
        const token = this.jwtService.sign(payload);
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
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: { verificationToken: token },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification token.');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email is already verified.');
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
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { success: true, message: 'If an account with that email exists, we sent a password reset link.' };
        }
        const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { resetToken, resetTokenExpiry },
        });
        const resetLink = `https://ultnexus.com/reset-password?token=${resetToken}`;
        await this.mailService.sendPasswordResetEmail({ email: user.email, resetLink });
        return { success: true, message: 'If an account with that email exists, we sent a password reset link.' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired password reset token.');
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
    async resendVerificationEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email is already verified.');
        }
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken },
        });
        const confirmLink = `http://localhost:3000/verify?token=${verificationToken}`;
        await this.mailService.sendVerificationEmail({ email: user.email, confirmLink });
        return { success: true, message: 'Verification email has been resent.' };
    }
    async setUsername(userId, username) {
        const existingUsers = await this.prisma.$queryRaw `
      SELECT * FROM "User" 
      WHERE username IS NOT NULL AND LOWER(username) = LOWER(${username})
    `;
        if (existingUsers && existingUsers.length > 0) {
            throw new common_1.BadRequestException('This username is already taken.');
        }
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    username: username,
                    isProfileCompleted: true
                }
            });
        }
        catch (e) {
            if (e.message && e.message.includes('check_username_format')) {
                throw new common_1.BadRequestException('Invalid or forbidden username.');
            }
            throw e;
        }
        return { success: true, message: 'Username successfully set.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map