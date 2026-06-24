import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

interface SendVerificationEmailProps {
  email: string;
  confirmLink: string;
}

@Injectable()
export class MailService {
  private resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_to_prevent_crash');
  }

  async sendVerificationEmail({ email, confirmLink }: SendVerificationEmailProps) {
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
    } catch (err) {
      this.logger.error('Mail gönderilirken beklenmedik hata:', err);
      return { success: false, error: err };
    }
  }
}
