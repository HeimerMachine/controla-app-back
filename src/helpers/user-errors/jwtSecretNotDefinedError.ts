import { ApiError } from "../apiError";

export class JWTSecretNotDefinedError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: JWT secret is not defined";
        super(500, message);
    }
}