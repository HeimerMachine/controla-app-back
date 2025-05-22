import { ApiError } from "../apiError";

export class InvalidConfirmPasswordError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Invalid confirm password";
        super(400, message);
    }
}