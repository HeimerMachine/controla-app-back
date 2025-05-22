import { ApiError } from "../apiError";

export class InvalidToken extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: JWT token is not valid";
        super(401, message);
    }
}