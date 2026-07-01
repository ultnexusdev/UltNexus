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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const require_verification_decorator_1 = require("../decorators/require-verification.decorator");
let VerifiedGuard = class VerifiedGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isVerificationRequired = this.reflector.getAllAndOverride(require_verification_decorator_1.IS_VERIFICATION_REQUIRED_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!isVerificationRequired) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || user.isVerified !== true) {
            throw new common_1.ForbiddenException('AUTH.EMAIL_NOT_VERIFIED');
        }
        return true;
    }
};
exports.VerifiedGuard = VerifiedGuard;
exports.VerifiedGuard = VerifiedGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], VerifiedGuard);
//# sourceMappingURL=verified.guard.js.map