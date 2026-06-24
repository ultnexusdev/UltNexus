"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
let MailService = MailService_1 = class MailService {
    resend;
    logger = new common_1.Logger(MailService_1.name);
    constructor() {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY || 're_mock_key_to_prevent_crash');
    }
    async sendVerificationEmail({ email, confirmLink }) {
        try {
            const { data, error } = await this.resend.emails.send({
                from: 'UltNexus <noreply@ultnexus.com>',
                to: [email],
                subject: 'UltNexus - Verify Your Email',
                html: `
          <div style="background-color: #09090b; color: #fafafa; font-family: sans-serif; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
            <h2 style="color: #a78bfa; margin-bottom: 20px;">Welcome to the UltNexus Universe! 🌌</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa;">
              We are thrilled to have you here. To activate your account and access all features, please verify your email address by clicking the button below.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmLink}" style="background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                Verify My Account
              </a>
            </div>
            <p style="font-size: 14px; color: #71717a; margin-top: 40px;">
              If you didn't request this, you can safely ignore and delete this email.
            </p>
          </div>
        `,
            });
            if (error) {
                this.logger.error('Resend Mail Hatası:', error);
                return { success: false, error };
            }
            return { success: true, data };
        }
        catch (err) {
            this.logger.error('Mail gönderilirken beklenmedik hata:', err);
            return { success: false, error: err };
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map