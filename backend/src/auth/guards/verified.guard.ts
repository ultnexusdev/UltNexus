import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_VERIFICATION_REQUIRED_KEY } from '../decorators/require-verification.decorator';

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isVerificationRequired = this.reflector.getAllAndOverride<boolean>(IS_VERIFICATION_REQUIRED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isVerificationRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || user.isVerified !== true) {
      throw new ForbiddenException('AUTH.EMAIL_NOT_VERIFIED');
    }

    return true;
  }
}
