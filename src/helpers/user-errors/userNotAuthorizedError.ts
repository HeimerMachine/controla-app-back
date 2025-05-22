import { ApiError } from "../apiError";

export class UserNotAuthorizedError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: User not authorized";
        super(401, message);
    }
}