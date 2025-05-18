import { ApiError } from "../apiError";

export class PasswordNotMatchError extends ApiError {
    constructor(message?: string) {
        message = message || 'Error: Mismatch between password and confirm password';
        super(400, message);
    }
}

