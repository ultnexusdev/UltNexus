interface SendVerificationEmailProps {
    email: string;
    confirmLink: string;
}
export declare class MailService {
    private resend;
    private readonly logger;
    constructor();
    sendVerificationEmail({ email, confirmLink }: SendVerificationEmailProps): Promise<{
        success: boolean;
        data: import("resend").CreateEmailResponseSuccess;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
}
export {};
