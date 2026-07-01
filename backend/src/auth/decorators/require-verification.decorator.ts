import { SetMetadata } from '@nestjs/common';

export const IS_VERIFICATION_REQUIRED_KEY = 'isVerificationRequired';
export const RequireVerification = () => SetMetadata(IS_VERIFICATION_REQUIRED_KEY, true);
