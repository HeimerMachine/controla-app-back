import { ApiError } from "../apiError";

export class UserAlreadyExistsError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: User already exists";
        super(409, message);
    }
}