"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireVerification = exports.IS_VERIFICATION_REQUIRED_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_VERIFICATION_REQUIRED_KEY = 'isVerificationRequired';
const RequireVerification = () => (0, common_1.SetMetadata)(exports.IS_VERIFICATION_REQUIRED_KEY, true);
exports.RequireVerification = RequireVerification;
//# sourceMappingURL=require-verification.decorator.js.map