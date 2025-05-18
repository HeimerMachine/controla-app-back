import { ApiError } from "../apiError";

export class UserNotFoundError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: User not found";
        super(404, message);
    }
}